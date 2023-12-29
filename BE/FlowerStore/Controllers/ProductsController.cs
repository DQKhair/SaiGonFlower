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
                          select new ProductFull
                          {
                              ProductId = p.ProductId,
                              ProductName = p.ProductName,
                              Price = p.Price,
                              Discount = p.Discount,
                              Image1 = p.Image1,
                              CategoryId = p.CategoryId,
                              RecipeId = p.RecipeId,
                              RecipeName = r.RecipeName,
                              CategoryName = c.CategoryName,

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
                               RecipeName = r.RecipeName,
                               CategoryName = c.CategoryName,
                               StoreId = s.StoreId,
                               StoreName = s.StoreName,
                               StoreDistrict = s.StoreDistrict,
                               Quantity = st.Quantity,

                           };
            if (newList1 == null)
            {
                return NotFound();
            }

            return await newList1.ToListAsync();
        }

        //GET GetQuantityProductOfStore
        [HttpGet("GetQuantityProductOfStore/StoreId={storeId}&&ProductId={productId}")]
        public async Task<ActionResult<ProductFull>> GetProduct(int storeId, int productId)
        {

            var parameters = new[] {
                new SqlParameter("@StoreId", storeId)
            };

            var product = await (from p in _context.Products
                                 join r in _context.Recipes on p.RecipeId equals r.RecipeId
                                 join c in _context.Categories on p.CategoryId equals c.CategoryId
                                 join st in _context.StoreDetails on p.ProductId equals st.ProductId
                                 join s in _context.Stores on st.StoreId equals s.StoreId
                                 where p.ProductId == productId && s.StoreId == storeId
                                 select new ProductFull
                                 {
                                     ProductId = p.ProductId,
                                     ProductName = p.ProductName,
                                     Price = p.Price,
                                     Discount = p.Discount,
                                     Image1 = p.Image1,
                                     CategoryId = p.CategoryId,
                                     RecipeId = p.RecipeId,
                                     RecipeName = r.RecipeName,
                                     CategoryName = c.CategoryName,
                                     StoreId = s.StoreId,
                                     StoreName = s.StoreName,
                                     Quantity = st.Quantity,
                                 }).SingleAsync();

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        ///

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
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductImage p)
        {
            var product = await _context.Products.SingleOrDefaultAsync(v => v.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            product.ProductName = p.ProductName;
            product.Price = p.Price;
            product.CategoryId = p.CategoryId;

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

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Cập nhật sản phẩm thành công!");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return BadRequest();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }


        [HttpPost]
        [Route("uploadfile")]
        public async Task<ActionResult> PostImageAsync([FromForm] ProductImage p)
        {
            if (p == null)
            {
                return BadRequest(new { error = "Dữ liệu không hợp lệ" });
            }

            var isProductNameDuplicate = _context.Products.Any(pr => pr.ProductName == p.ProductName);

            if (isProductNameDuplicate)
            {

                return BadRequest(new { error = "Tên sản phẩm đã tồn tại " });
            }


            var storeWithRecipe = _context.Products.Any(pr => pr.RecipeId == p.RecipeId);
            if (storeWithRecipe)
            {

                return BadRequest(new { error = "Công thức đã được sử dụng" });


            }

            //var QuantityStock = _context.StockDetails.FirstOrDefault(s => s.Quantity <= 0 && _context.RecipeDetails.Any(pr => pr.MaterialId == s.MaterialId && _context.StoreDetails.Any(st => s.StoreId == st.StoreId)));
            //if (QuantityStock != null)
            //{

            //    return BadRequest("đã hết nguyên liệu");


            //}

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

            try
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Sản phẩm đã được thêm thành công", productId = product.ProductId });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về thông báo lỗi
                return BadRequest(new { error = "Lỗi khi thêm sản phẩm: " + ex.Message });
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

        //Get Product {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductFull>> GetProduct(int id)
        {

            var product = await (from p in _context.Products
                                 join r in _context.Recipes on p.RecipeId equals r.RecipeId
                                 join c in _context.Categories on p.CategoryId equals c.CategoryId
                                 //join st in _context.StoreDetails on p.ProductId equals st.ProductId
                                 //join s in _context.Stores on st.StoreId equals s.StoreId
                                 where p.ProductId == id
                                 select new ProductFull
                                 {
                                     ProductId = p.ProductId,
                                     ProductName = p.ProductName,
                                     Price = p.Price,
                                     Discount = p.Discount,
                                     Image1 = p.Image1,
                                     CategoryId = p.CategoryId,
                                     RecipeId = p.RecipeId,
                                     RecipeName = r.RecipeName,
                                     CategoryName = c.CategoryName,

                                 }).SingleAsync();

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
            if (id == 0)
            {
                return await _context.Products.ToListAsync();
            }

            var list = _context.Products.FromSqlInterpolated($"GetProductsByCategory {id}");

            return await list.ToListAsync();
        }

        [HttpPost("AddQuantityAndStoreId/{productId}")]
        public async Task<ActionResult> AddQuantityAndStoreId(int productId, [FromBody] StoreDetailInputModel inputModel)
        {
            try
            {
                // Kiểm tra xem có sản phẩm với ProductId tương ứng không
                var product = await _context.Products
                    .FirstOrDefaultAsync(p => p.ProductId == productId);

                if (product == null)
                {
                    return NotFound($"Không tìm thấy sản phẩm với ProductId {productId}");
                }

                // Kiểm tra xem đã có StoreDetail với cùng StoreId và ProductId chưa
                var existingStoreDetail = await _context.StoreDetails
                    .FirstOrDefaultAsync(sd => sd.StoreId == inputModel.StoreId && sd.ProductId == productId);

                if (existingStoreDetail != null)
                {
                    return BadRequest($"StoreDetail với StoreId {inputModel.StoreId} đã tồn tại ProductId {productId} ");
                }

                // Tạo một StoreDetail mới
                var storeDetail = new StoreDetail
                {
                    Quantity = inputModel.Quantity,
                    StoreId = inputModel.StoreId,
                    ProductId = productId
                };

                // Kiểm tra và cập nhật số lượng ở kho dựa trên bảng công thức
                var recipeDetails = await _context.RecipeDetails
                    .Where(rd => rd.RecipeId == product.RecipeId)
                    .ToListAsync();

                // Danh sách để lưu trữ nguyên liệu thiếu
                var recipesShortage = new List<string>();

                foreach (var recipeDetail in recipeDetails)
                {
                    // Kiểm tra xem có đủ số lượng trong kho không
                    var stockDetail = await _context.StockDetails
                        .FirstOrDefaultAsync(sd => sd.StoreId == inputModel.StoreId && sd.MaterialId == recipeDetail.MaterialId);

                    if (stockDetail == null || stockDetail.Quantity < recipeDetail.Quantity * inputModel.Quantity)
                    {
                        recipesShortage.Add($"Không đủ số lượng trong kho cho nguyên liệu: {recipeDetail.MaterialId}! Vui lòng nhập thêm nguyên liệu hoặc ít số lượng hơn.");
                        //return BadRequest($"Không đủ số lượng trong kho cho nguyên liệu với RecipeId {recipeDetail.RecipeId}");
                    }
                    else
                    {
                        // Cập nhật số lượng trong kho
                        stockDetail.Quantity -= recipeDetail.Quantity * inputModel.Quantity;
                    }
                }


                if (recipesShortage.Any())
                {
                    // Trả về BadRequest với danh sách nguyên liệu thiếu
                    return BadRequest(recipesShortage);
                }

                // Thêm StoreDetail vào cơ sở dữ liệu
                _context.StoreDetails.Add(storeDetail);
                await _context.SaveChangesAsync();

                return Ok("Thêm thành công");
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi thêm StoreDetail: {ex.Message}");
            }
        }

        public class StoreDetailInputModel
        {
            public int Quantity { get; set; }
            public int StoreId { get; set; }
        }

        [HttpPut("UpdateQuantity")]
        public async Task<ActionResult> UpdateQuantity([FromBody] StoreDetailUpdateModel updateModel)
        {
            try
            {
                // Kiểm tra xem có StoreDetail với StoreId và ProductId tương ứng không
                var storeDetail = await _context.StoreDetails
                    .FirstOrDefaultAsync(sd => sd.StoreId == updateModel.StoreId && sd.ProductId == updateModel.ProductId);

                if (storeDetail == null)
                {
                    return NotFound($"Không tìm thấy StoreDetail với StoreId {updateModel.StoreId} và ProductId {updateModel.ProductId}");
                }

                // Cập nhật Quantity
                storeDetail.Quantity = updateModel.Quantity;

                await _context.SaveChangesAsync();

                return Ok(storeDetail);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi cập nhật Quantity: {ex.Message}");
            }
        }

        public class StoreDetailUpdateModel
        {
            public int StoreId { get; set; }
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }

        //Khai
        [HttpGet("GetNameStoreForDetailProduct/{productId}")]
        public async Task<IActionResult> GetNameStoreForDetailProduct(int productId)
        {
            var _productDetail = from product in _context.Products
                                 join storeDetail in _context.StoreDetails
                                 on product.ProductId equals storeDetail.ProductId
                                 join Store in _context.Stores
                                 on storeDetail.StoreId equals Store.StoreId
                                 where product.ProductId == productId
                                 select new
                                 {
                                     ProductId = product.ProductId,
                                     ProductName = product.ProductName,
                                     CategoryId = product.CategoryId,
                                     RecipeId = product.RecipeId,
                                     StoreDetailId = storeDetail.StoreDetailId,
                                     Quantity = storeDetail.Quantity,
                                     StoreId = storeDetail.StoreId,
                                     StoreName = Store.StoreName
                                 };
            var result = await _productDetail.ToListAsync();
            return Ok(result);
        }

        [HttpPut("MinusProductCheckoutSuccess")]
        public async Task<IActionResult> MinusProductCheckoutSuccess(MinusProductCheckOutSuccess minusPro)
        {
            if (minusPro == null)
            {
                return BadRequest();
            }
            for (int i = 0; i < minusPro.ProductId.Length; i++)
            {
                var _storeDetail = await _context.StoreDetails.SingleOrDefaultAsync(sd => sd.StoreId == minusPro.StoreId[i] && sd.ProductId == minusPro.ProductId[i]);
                try
                {
                    if (_storeDetail == null)
                    {
                        return BadRequest();
                    }
                    if (_storeDetail.Quantity >= minusPro.Quantity[i])
                    {
                        _storeDetail.Quantity -= minusPro.Quantity[i];
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return BadRequest("Số lượng sản phẩm không đủ");
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }
            return NoContent();
        }

        [HttpPut("RefundMinusProductCheckoutSuccess")]
        public async Task<IActionResult> RefundMinusProductCheckoutSuccess(MinusProductCheckOutSuccess minusPro)
        {
            if (minusPro == null)
            {
                return BadRequest();
            }
            for (int i = 0; i < minusPro.ProductId.Length; i++)
            {
                var _storeDetail = await _context.StoreDetails.SingleOrDefaultAsync(sd => sd.StoreId == minusPro.StoreId[i] && sd.ProductId == minusPro.ProductId[i]);
                try
                {
                    if (_storeDetail == null)
                    {
                        return BadRequest();
                    }

                    _storeDetail.Quantity += minusPro.Quantity[i];
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }
            }
            return NoContent();
        }


        [HttpGet("GetQuantityProductWithStore/storeId={storeId}&&productId={productId}")]

        public async Task<IActionResult> GetQuantityProductWithStore(int? storeId, int? productId)
        {
            if (storeId == null || productId == null)
            {
                return NotFound();
            }
            var storeDetails = await _context.StoreDetails.SingleOrDefaultAsync(sd => sd.StoreId == storeId && sd.ProductId == productId);
            if (storeDetails == null)
            {
                return NotFound();
            }
            return Ok(storeDetails);
        }

        //End Khai


        //Phuc
        [HttpGet("getProductByPriceRange/minPrice={minPrice}&&maxPrice={maxPrice}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByPriceRange(int minPrice, int maxPrice)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var filteredProducts = _context.Products.Where(product => product.Price >= minPrice && product.Price <= maxPrice);

            return await filteredProducts.ToListAsync();
        }

        //Get Product By Material
        [HttpGet("getProductByMaterial/materialName={materialName}")]
        public async Task<ActionResult> getProductByMaterial(string materialName)
        {
            if (String.IsNullOrEmpty(materialName))
            {
                return NotFound();
            }

            var products = await _context.Products
                .Join(_context.RecipeDetails,
                    p => p.RecipeId,
                    rd => rd.RecipeId,
                    (p, rd) => new { Product = p, RecipeDetail = rd }
                )
                .Join( _context.Materials,
                    prd => prd.RecipeDetail.MaterialId,
                    m => m.MaterialId,
                    (prd, m) => new { Product = prd.Product, Material = m }
                )
                .Where(prd => prd.Material.MaterialName == materialName)
                .Select(prd => prd.Product)
                .ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }

        //Get List Other Product 
        [HttpGet("getOtherProduct/categoryId={cateId}")]
        public async Task<ActionResult<IEnumerable<Product>>> getOtherProduct(int cateId)
        {
            if (cateId == 0)
            {
                return NotFound();
            }
            var product = await _context.Products.Where(p => p.CategoryId == cateId)
                .OrderByDescending(x => x.ProductId)
                .Take(4)
                .ToListAsync();
            if(product == null)
            { 
                return NotFound(); 
            }
            return Ok(product);
        }

        //End Phuc


        //hiep them
        [HttpGet("searchFull")]
        public async Task<ActionResult<IEnumerable<ProductFull>>> SearchProductsFull([FromQuery] string productName)
        {
            try
            {
                var result = await _context.Products
                .Join(
                    _context.StoreDetails,
                    product => product.ProductId,
                    storeDetail => storeDetail.ProductId,
                    (product, storeDetail) => new { Product = product, StoreDetail = storeDetail }
                )
                .Join(
                    _context.Stores,
                    joinResult => joinResult.StoreDetail.StoreId,
                    store => store.StoreId,
                    (joinResult, store) => new { ProductStore = joinResult, Store = store }
                )
                .Where(joinResult => joinResult.ProductStore.Product.ProductName.Contains(productName))
                .Select(joinResult => new ProductFull
                {
                    ProductId = joinResult.ProductStore.Product.ProductId,
                    ProductName = joinResult.ProductStore.Product.ProductName,
                    Price = joinResult.ProductStore.Product.Price,
                    Discount = joinResult.ProductStore.Product.Discount,
                    Image1 = joinResult.ProductStore.Product.Image1,
                    CategoryId = joinResult.ProductStore.Product.CategoryId,
                    RecipeId = joinResult.ProductStore.Product.RecipeId,
                    CategoryName = joinResult.ProductStore.Product.Category != null ? joinResult.ProductStore.Product.Category.CategoryName : null,
                    RecipeName = joinResult.ProductStore.Product.Recipe != null ? joinResult.ProductStore.Product.Recipe.RecipeName : null,
                    StoreId = joinResult.ProductStore.StoreDetail.StoreId ?? 0,
                    StoreName = joinResult.ProductStore.StoreDetail.Store != null ? joinResult.ProductStore.StoreDetail.Store.StoreName : null,

                    // Thêm StoreDistrict vào đây
                    StoreDistrict = joinResult.Store.StoreDistrict,
                    Quantity = joinResult.ProductStore.StoreDetail.Quantity,

                })
                .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error searching products: {ex.Message}");
            }
        }


        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ProductFull>>> SearchProducts([FromQuery] string productName, string userDistrict)
        {
            try
            {
                var query = _context.Products
                    .Join(
                        _context.StoreDetails,
                        product => product.ProductId,
                        storeDetail => storeDetail.ProductId,
                        (product, storeDetail) => new { Product = product, StoreDetail = storeDetail }
                    )
                    .Join(
                        _context.Stores,
                        joinResult => joinResult.StoreDetail.StoreId,
                        store => store.StoreId,
                        (joinResult, store) => new { ProductStore = joinResult, Store = store }
                    )
                    .Where(joinResult => joinResult.ProductStore.Product.ProductName.Contains(productName));

                switch (userDistrict)
                {
                    case "quận 1":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 10", "Quận Bình thạnh", "Quận Phú nhuận" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 2":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 2", "Quận 4", "Quận 7", "Quận Bình thạnh", "Quận thủ đức" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 3":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 3", "Quận 5", "Quận 10", "Quận Bình thạnh", "Quận Phú nhuận", "Quận tân bình" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 4":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 2", "Quận 4", "Quận 5", "Quận 7", "Quận 8" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 5":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 8", "Quận 10", "Quận 11" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 6":
                        query = query.Where(joinResult => new[] { "Quận 11", "Quận 8", "Quận 5" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 7":
                        query = query.Where(joinResult => new[] { "Quận 4", "Quận 2", "Quận 8" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 8":
                        query = query.Where(joinResult => new[] { "Quận 4", "Quận 5", "Quận 6" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 9":
                        query = query.Where(joinResult => new[] { "Quận 12", "Quận Bình thạnh" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 10":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 3", "Quận 5", "Quận 10", "Quận 11", "Quận tân bình" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 11":
                        query = query.Where(joinResult => new[] { "Quận 11", "Quận 6", "Quận 5", "Quận 10" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận 12":
                        query = query.Where(joinResult => new[] { "Quận 12", "Quận 9", "Quận Gò vấp", "Quận thủ đức" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận bình thạnh":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 2", "Quận Bình thạnh", "Quận Phú nhuận", "Quận Gò vấp", "Quận thủ đức" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận phú nhuận":
                        query = query.Where(joinResult => new[] { "Quận 1", "Quận 3", "Quận Bình thạnh", "Quận Phú nhuận", "Quận Gò vấp", "Quận tân bình" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận gò vấp":
                        query = query.Where(joinResult => new[] { "Quận 12", "Quận Bình thạnh", "Quận Phú nhuận", "Quận Gò vấp", "Quận tân bình" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    case "quận tân bình":
                        query = query.Where(joinResult => new[] { "Quận 12", "Quận Gò vấp", "Quận Phú nhuận", "Quận tân bình" }.Contains(joinResult.Store.StoreDistrict));
                        break;
                    // Thêm các case khác nếu cần

                    default:
                        query = query.Where(joinResult => string.IsNullOrEmpty(userDistrict) || userDistrict == joinResult.Store.StoreDistrict);
                        break;
                }

                var result = await query
                    .Select(joinResult => new ProductFull
                    {
                        ProductId = joinResult.ProductStore.Product.ProductId,
                        ProductName = joinResult.ProductStore.Product.ProductName,
                        Price = joinResult.ProductStore.Product.Price,
                        Discount = joinResult.ProductStore.Product.Discount,
                        Image1 = joinResult.ProductStore.Product.Image1,
                        CategoryId = joinResult.ProductStore.Product.CategoryId,
                        RecipeId = joinResult.ProductStore.Product.RecipeId,
                        CategoryName = joinResult.ProductStore.Product.Category != null ? joinResult.ProductStore.Product.Category.CategoryName : null,
                        RecipeName = joinResult.ProductStore.Product.Recipe != null ? joinResult.ProductStore.Product.Recipe.RecipeName : null,
                        StoreId = joinResult.ProductStore.StoreDetail.StoreId ?? 0,
                        StoreName = joinResult.ProductStore.StoreDetail.Store != null ? joinResult.ProductStore.StoreDetail.Store.StoreName : null,
                        StoreDistrict = joinResult.Store.StoreDistrict,
                        Quantity = joinResult.ProductStore.StoreDetail.Quantity,
                    })
                    .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error searching products: {ex.Message}");
            }
        }


        [HttpGet("searchByArea")]
        public async Task<ActionResult<IEnumerable<ProductFull>>> SearchProductsByArea([FromQuery] string area)
        {
            try
            {
                var result = await _context.Products
                    .Join(
                        _context.StoreDetails,
                        product => product.ProductId,
                        storeDetail => storeDetail.ProductId,
                        (product, storeDetail) => new { Product = product, StoreDetail = storeDetail }
                    )
                    .Join(
                        _context.Stores,
                        joinResult => joinResult.StoreDetail.StoreId,
                        store => store.StoreId,
                        (joinResult, store) => new { ProductStore = joinResult, Store = store }
                    )
                    .Where(joinResult =>
                        joinResult.Store.StoreDistrict.ToLower() == area.ToLower())
                    .Select(joinResult => new ProductFull
                    {
                        ProductId = joinResult.ProductStore.Product.ProductId,
                        ProductName = joinResult.ProductStore.Product.ProductName,
                        Price = joinResult.ProductStore.Product.Price,
                        Discount = joinResult.ProductStore.Product.Discount,
                        Image1 = joinResult.ProductStore.Product.Image1,
                        CategoryId = joinResult.ProductStore.Product.CategoryId,
                        RecipeId = joinResult.ProductStore.Product.RecipeId,
                        CategoryName = joinResult.ProductStore.Product.Category != null ? joinResult.ProductStore.Product.Category.CategoryName : null,
                        RecipeName = joinResult.ProductStore.Product.Recipe != null ? joinResult.ProductStore.Product.Recipe.RecipeName : null,
                        StoreId = joinResult.ProductStore.StoreDetail.StoreId ?? 0,
                        StoreName = joinResult.ProductStore.StoreDetail.Store != null ? joinResult.ProductStore.StoreDetail.Store.StoreName : null,
                        StoreDistrict = joinResult.Store.StoreDistrict,
                        Quantity = joinResult.ProductStore.StoreDetail.Quantity
                    })
                    .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error searching products: {ex.Message}");
            }
        }



        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}
