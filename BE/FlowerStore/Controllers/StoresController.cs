using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using System.Security.Cryptography.X509Certificates;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public StoresController(FlowerStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetAllStore()
        {
            try
            {
                var _stores = await _context.Stores.ToListAsync();

                return Ok(_stores);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetStoreById(int id)
        {
            try
            {
                var _store = await _context.Stores.SingleOrDefaultAsync(c => c.StoreId == id);

                return Ok(_store);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Store>>> PostStoreNew(Store store)
        {
            try
            {
                var BcryPass = BCrypt.Net.BCrypt.HashPassword(store.StorePassword);

                var _store = new Store();
                _store.StoreName = store.StoreName;
                _store.StorePhone = store.StorePhone;
                _store.StoreStreet = store.StoreStreet;
                _store.StoreWard = store.StoreWard;
                _store.StoreDistrict = store.StoreDistrict;
                _store.StoreUserName = store.StoreUserName;
                _store.StorePassword = BcryPass;
                _store.StoreStatus = true;
                _store.RoleId = 2;

                _context.Stores.Add(_store);
                await _context.SaveChangesAsync();

                return Ok(_store);
            } catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("ResetPasswordStore/{id}")]
        public async Task<IActionResult> ResetPasswordStore(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StorePassword = BCrypt.Net.BCrypt.HashPassword("sgf@123");
                await _context.SaveChangesAsync();
                return NoContent();

            } catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("StatusStoreOff/{id}")]
        public async Task<IActionResult> UpdateStatusStoreOff(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StoreStatus = false;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("StatusStoreOn/{id}")]
        public async Task<IActionResult> UpdateStatusStoreOn(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StoreStatus = true;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("UpdateInfoStore/{id}")]
        public async Task<IActionResult> UpdateInfoStore(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if(_store == null)
                {
                    return BadRequest();
                }
                _store.StoreName = store.StoreName;
                _store.StorePhone = store.StorePhone;
                _store.StoreStreet = store.StoreStreet;
                _store.StoreWard = store.StoreWard;
                _store.StoreDistrict = store.StoreDistrict;
                await _context.SaveChangesAsync();
                return NoContent();
                
            }catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        //Store Profile
        [HttpGet("GetProfileStore/{storeId}")]
        public async Task<IActionResult> GetProfileStore(int? storeId)
        {
            if (storeId == null)
            {
                return NotFound();
            }
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == storeId);
            try
            {
                if (_store == null)
                {
                    return NotFound();
                }
                return Ok(_store);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        //End store profile


        //// PUT: Update Product Quantity
        [HttpPut("UpdateProductQuantity/StoreId={storeId}&&ProductId={productId}")]
        public async Task<IActionResult> UpdateProductQuantity(int storeId, int productId, [FromBody] ProductOfStoreNew productDetail)
        {
            var store = await _context.Stores.Include(x => x.StoreDetails).FirstOrDefaultAsync(x => x.StoreId == storeId);
            if (store == null)
            {
                return NotFound();
            }

            var storeDetail = store.StoreDetails.FirstOrDefault(x => x.ProductId == productId);
            if (storeDetail == null)
            {
                return NotFound();
            }


            try
            {
                if (productDetail.QuantityProduct <= storeDetail.Quantity)
                {
                    storeDetail.Quantity -= Convert.ToInt32(productDetail.QuantityProduct);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest("Số lượng sản phẩm không đủ");
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreDetailExists(storeId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(productDetail);
        }

        //// PUT: Refund Product Quantity
        [HttpPut("RefundProductQuantity/StoreId={storeId}&&ProductId={productId}")]
        public async Task<IActionResult> RefundProductQuantity(int storeId, int productId, [FromBody] ProductOfStoreNew productDetail)
        {
            var store = await _context.Stores.Include(x => x.StoreDetails).FirstOrDefaultAsync(x => x.StoreId == storeId);
            if (store == null)
            {
                return NotFound();
            }

            var storeDetail = store.StoreDetails.FirstOrDefault(x => x.ProductId == productId);
            if (storeDetail == null)
            {
                return NotFound();
            }


            try
            {
                if (productDetail.QuantityProduct <= storeDetail.Quantity)
                {
                    storeDetail.Quantity += Convert.ToInt32(productDetail.QuantityProduct);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreDetailExists(storeId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(productDetail);
        }

        [HttpDelete("DeleteOrder/{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var orderDetails = await _context.OrderDetails.Where(x => x.OrderId == orderId).ToListAsync();

            if (orderDetails.Any())
            {
                _context.OrderDetails.RemoveRange(orderDetails);
            }

            var order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);

            if (order != null)
            {
                _context.Orders.Remove(order);
            }

            await _context.SaveChangesAsync();

            return Ok("Tạo đơn không thành công!");
        }

        private bool StoreDetailExists(int id)
        {
            return (_context.StoreDetails?.Any(e => e.StoreDetailId == id)).GetValueOrDefault();
        }

    }
}
