using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using FlowerStore.Temp;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public OrderDetailsController(FlowerStoreContext context)
        {
            _context = context;
        }


        // GET: api/OrderDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
        {
          if (_context.OrderDetails == null)
          {
              return NotFound();
          }
            return await _context.OrderDetails.ToListAsync();
        }

        // GET: api/OrderDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetail(int id)
        {
          if (_context.OrderDetails == null)
          {
              return NotFound();
          }
            var orderDetail = await _context.OrderDetails.FindAsync(id);

            if (orderDetail == null)
            {
                return NotFound();
            }

            return orderDetail;
        }

        // PUT: api/OrderDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetail(int id, OrderDetail orderDetail)
        {
            if (id != orderDetail.OrderDetailId)
            {
                return BadRequest();
            }

            _context.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(id))
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

        // POST: api/OrderDetails
        [HttpPost]
        public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
        {
          if (_context.OrderDetails == null)
          {
              return Problem("Entity set 'FlowerStoreContext.OrderDetails'  is null.");
          }
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderDetail", new { id = orderDetail.OrderDetailId }, orderDetail);
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            if (_context.OrderDetails == null)
            {
                return NotFound();
            }
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("statisticProduct")]
        public ActionResult<IEnumerable<statisticProduct>> GetListStatisticOfProduct(int month, int year)
        {
            var b = _context.OrderDetails
                 .Include(od => od.Order)
                 .Include(od => od.Product)
                 .Where(od => od.Order.OrderDate!.Value.Month == month
                         && od.Order.OrderDate.Value.Year == year
                         && od.Order.OrderStatusId == 4)
                 .GroupBy(od => new { od.ProductId, od.Product.ProductName, od.Product.Price })
                 .Select(group => new statisticProduct
                 {
                     ProductId = group.Key.ProductId,
                     ProductName = group.Key.ProductName,
                     Price = group.Key.Price,
                     TotalQuantity = group.Sum(od => od.Quantity),
                     TotalPrice = (group.Key.Price) * (group.Sum(od => od.Quantity)),
                 });
            return Ok(b);
        }

        private bool OrderDetailExists(int id)
        {
            return (_context.OrderDetails?.Any(e => e.OrderDetailId == id)).GetValueOrDefault();
        }
    }
}
