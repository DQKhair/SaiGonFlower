using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using System.Drawing;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductViewsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;
        private readonly ILogger<ProductViewsController> _logger;

        public ProductViewsController(FlowerStoreContext context)
        {
            this._context = context;
        }

        // GET: api/ProductViews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductView>>> GetProductViews()
        {
            if (_context.ProductViews == null)
            {
                return NotFound();
            }
            return await _context.ProductViews.ToListAsync();
        }

        // GET: api/ProductViews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductView>> GetProductView(int id)
        {
            if (_context.ProductViews == null)
            {
                return NotFound();
            }
            var productView = await _context.ProductViews.FindAsync(id);

            if (productView == null)
            {
                return NotFound();
            }

            return productView;
        }

        // PUT: api/ProductViews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductView(int id, ProductView productView)
        {
            if (id != productView.ProductViewId)
            {
                return BadRequest();
            }

            _context.Entry(productView).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductViewExists(id))
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

        // POST: api/ProductViews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductView>> PostProductView(ProductView productView)
        {
            if (_context.ProductViews == null)
            {
                return Problem("Entity set 'FlowerStoreContext.ProductViews'  is null.");
            }
            _context.ProductViews.Add(productView);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductView", new { id = productView.ProductViewId }, productView);
        }

        // DELETE: api/ProductViews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductView(int id)
        {
            if (_context.ProductViews == null)
            {
                return NotFound();
            }
            var productView = await _context.ProductViews.FindAsync(id);
            if (productView == null)
            {
                return NotFound();
            }

            _context.ProductViews.Remove(productView);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        ///
        //Get Rate Statistics By Customer
        //[HttpGet("getRateStatisticsByCustomer/{customerId}")]
        //public async Task<ActionResult<IEnumerable<Product>>> getRateStatisticsByCustomer(int customerId)
        //{
        //    if (customerId == 0)
        //    {
        //        return NotFound();
        //    }
        //    var productView = await _context.ProductViews.Where(pv => pv.CustomerId == customerId).ToListAsync();
        //    if (productView == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(productView);
        //}

        //Get Rate Statistics By Customer
        [HttpGet("getRateStatisticsByCustomer/{customerId}")]
        public async Task<IActionResult> getRateStatisticsByCustomer(int customerId)
        {
            var _productView = from productView in _context.ProductViews
                               join product in _context.Products
                               on productView.ProductId equals product.ProductId
                               join customer in _context.Customers
                               on productView.CustomerId equals customer.CustomerId
                               where productView.CustomerId == customerId
                               select new
                               {
                                   productViewId = productView.ProductViewId,
                                   productId = productView.ProductId,
                                   productName = product.ProductName,
                                   customerId = productView.CustomerId,
                                   customerName = customer.CustomerName,
                                   customerPhone = customer.CustomerPhone,
                                   customerUsername = customer.CustomerUserName,
                                   viewCount = productView.ViewCount,
                                   purchaseCount = productView.PurchaseCount
                               };
            var result = await _productView.ToListAsync();
            return Ok(result);
        }

        // GET: getRateStatisticsByProduct
        [HttpGet("getRateStatisticsByProduct")]
        public async Task<ActionResult<IEnumerable<ProductView>>> GetRateStatisticsByProduc()
        {
            var _productView = from productView in _context.ProductViews
                               join product in _context.Products
                               on productView.ProductId equals product.ProductId
                               group productView by productView.ProductId into groupedProductView
                               select new
                               {
                                   productId = groupedProductView.Key,
                                   productName = groupedProductView.First().Products.ProductName,
                                   viewCount = groupedProductView.Sum(pv => pv.ViewCount),
                                   purchaseCount = groupedProductView.Sum(pv => pv.PurchaseCount)
                               };
            var result = await _productView.ToListAsync();
            return Ok(result);
        }

        ///PUT: Update view count
        [HttpPut("UpdateViewCount/customerId={customerId}&&productId={productId}")]
        public async Task<IActionResult> UpdateViewCount(int customerId, int productId)
        {
            //var productView = await _context.ProductViews.FirstOrDefaultAsync(pv => pv.CustomerId == customerId && pv.ProductId == productId);

            //if (productView == null)
            //{
            //    return NotFound();
            //}

            //productView.ViewCount += 1;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!ProductViewExists(productView.ProductViewId))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();

            ///
            var productViews = await _context.ProductViews.Where(pv => pv.CustomerId == customerId && pv.ProductId == productId).ToListAsync();

            if (productViews == null)
            {
                return NotFound();
            }

            var productView = productViews.First(); 

            try
            {
                productView.ViewCount += 1;
                _context.SaveChanges();
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }

        }


        ///PUT: Update Purchase Count
        [HttpPut("UpdatePurchaseCount/customerId={customerId}&&productId={productId}")]
        public async Task<IActionResult> UpdatePurchaseCount(int customerId, int productId)
        {
            var productViews = await _context.ProductViews.Where(pv => pv.CustomerId == customerId && pv.ProductId == productId).ToListAsync();

            if (productViews == null)
            {
                return NotFound();
            }

            var productView = productViews.First();

            try
            {
                productView.PurchaseCount += 1;
                _context.SaveChanges();
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        ///

        private bool ProductViewExists(int id)
        {
            return (_context.ProductViews?.Any(e => e.ProductViewId == id)).GetValueOrDefault();
        }
    }
}
