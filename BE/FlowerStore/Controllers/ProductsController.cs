using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using Microsoft.Data.SqlClient;
using FlowerStore.Temp;
using Microsoft.CodeAnalysis;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public ProductsController(FlowerStoreContext context)
        {
            _context = context;
        }


        [HttpGet("GetProductsForCompany")]
        public async Task<ActionResult<IEnumerable<ProductFull>>> GetProductsForCompany()
        {
            //var products = await _context.Set<Product>().FromSqlInterpolated($"EXEC GetProductFull").ToListAsync();
            //return products;
            //var store = _context.StoreDetails.Include(x => x.Store);
            //var products = _context.Products.Include(x => x.Category).Include(store).Include(z => z.Recipe);

            var newList = from p in _context.Products

                          join r in _context.Recipes on p.RecipeId equals r.RecipeId
                          join c in _context.Categories on p.CategoryId equals c.CategoryId
                          join st in _context.StoreDetails on p.ProductId equals st.ProductId
                          join s in _context.Stores on st.StoreId equals s.StoreId
                          select new ProductFull
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              Price = p.Price,
                              Discount = p.Discount,
                              Image1 = p.Image1,
                              CategoryId = p.CategoryId,
                              RecipeId = p.RecipeId,
                              CategoryName = c.CategoryName,
                              StoreName = s.StoreName,
                              Quantity = st.Quantity,

                          };
            if (newList == null)
            {
                return NotFound();
            }

            return await newList.ToListAsync();
        }

        [HttpGet("GetProductsForStore/{id}")]
        public async Task<ActionResult<IEnumerable<ProductFull>>> GetProductsForStore(int id)
        {
            var parameters = new[] {
                new SqlParameter("@StoreId", id)
            };

            var newList1 = from p in _context.Products

                           join r in _context.Recipes on p.RecipeId equals r.RecipeId
                           join c in _context.Categories on p.CategoryId equals c.CategoryId
                           join st in _context.StoreDetails on p.ProductId equals st.ProductId
                           join s in _context.Stores on st.StoreId equals s.StoreId
                           where s.StoreId == id
                           select new ProductFull
                           {
                               ProductId = p.ProductId,
                               ProductName = p.ProductName,
                               Price = p.Price,
                               Discount = p.Discount,
                               Image1 = p.Image1,
                               CategoryId = p.CategoryId,
                               RecipeId = p.RecipeId,
                               CategoryName = c.CategoryName,
                               StoreName = s.StoreName,
                               Quantity = st.Quantity,
                               StoreId = s.StoreId,

                           };
            if (newList1 == null)
            {
                return NotFound();
            }

            return await newList1.ToListAsync();
        }
        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            return await _context.Products.ToListAsync();
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        [Route("uploadfile")]
        public async Task<ActionResult> PostImageAsync([FromForm] ProductImage p)
        {
            if (p == null)
            {
                return BadRequest("Dữ liệu không hợp lệ");
            }

            if (string.IsNullOrEmpty(p.ProductName))
            {
                return BadRequest("Tên sản phẩm không được để trống");
            }

            var product = new Product();
            product.ProductName = p.ProductName;
            product.Price = p.Price;
            product.Discount = p.Discount;
            product.CategoryId = p.CategoryId;
            product.RecipeId = p.RecipeId;

            if (p.Images != null && p.Images.Length > 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", p.Images.FileName);
                try
                {
                    using (var stream = System.IO.File.Create(path))
                    {
                        await p.Images.CopyToAsync(stream);
                    }
                    product.Image1 = "/images/" + p.Images.FileName;
                }
                catch (Exception ex)
                {
                    return BadRequest("Lỗi khi lưu trữ hình ảnh: " + ex.Message);
                }
            }
            else
            {
                product.Image1 = "";
            }

            _context.Products.Add(product);

            try
            {
                await _context.SaveChangesAsync();
                int productId = product.ProductId; // Lấy ProductId sau khi thêm

                // Kiểm tra giá trị hợp lệ trước khi gọi thủ tục lưu trữ
                if (productId > 0 && p.StoreId > 0 && p.RecipeId > 0 && p.QuantityToProduce > 0)
                {
                    _context.CallYourStoredProcedure(p.StoreId, p.RecipeId, p.QuantityToProduce, productId);
                }
                else
                {
                    return BadRequest("Dữ liệu không hợp lệ cho thủ tục lưu trữ");
                }

                return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi khi lưu trữ sản phẩm: " + ex.Message);
            }
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        [HttpGet("getByCategory/{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var list = _context.Products.FromSqlInterpolated($"GetProductsByCategory {id}");

            return await list.ToListAsync();
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}
