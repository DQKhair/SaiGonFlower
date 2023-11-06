using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Security.Cryptography.X509Certificates;
using FlowerStore.Temp;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public OrdersController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderStatus)
               .Select(o => new OrderNew
               {
                   OrderId = o.OrderId,
                   OrderDate = o.OrderDate,
                   CustomerName = o.Customer != null ? o.Customer.CustomerName : o.NameCusNonAccount,
                   CustomerPhone = o.Customer != null ? o.Customer.CustomerPhone : o.PhoneCusNonAccount,
                   OrderStatus = o.OrderStatus.OrderStatusName
               })
               .ToListAsync();

            return Ok(orders);

        }

        // GET: api/Orders/5
        //Chi tiet don hang
        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderDetail(int id)
        {
#pragma warning disable CS8602
            var orderDetail = _context.Orders.Include(o => o.OrderDetails).ThenInclude(od => od.Product)
               .Include(o => o.Customer)
               .Include(o => o.OrderStatus)
               .Include(o => o.OrderMethod)
               .Where(o => o.OrderId == id)
               .Select(o => new OrderDetailById
               {
                   OrderId = o.OrderId,
                   OrderDate = o.OrderDate,
                   TotalQuantity = o.TotalQuantity,
                   TotalPrice = o.TotalPrice,

                   OrderDetail = o.OrderDetails.Select(od => new OrderDetailNewById
                   {
                       OrderDetailId = od.OrderDetailId,
                       Quantity = od.Quantity,
                       Price = od.Price,
                       ProductName = od.Product.ProductName
                   }).ToList(),

                   CustomerName = o.Customer != null ? o.Customer.CustomerName : o.NameCusNonAccount,
                   CustomerPhone = o.Customer != null ? o.Customer.CustomerPhone : o.PhoneCusNonAccount,
                   CustomerAddress = o.Customer != null ? o.Customer.CustomerAddress : o.AddressCusNonAccount,

                   OrderStatusName = o.OrderStatus.OrderStatusName,
                   OrderMethodName = o.OrderMethod.OrderMethodName,
                   StoreName = o.Store.StoreName
               })
               .FirstOrDefault();

            return Ok(orderDetail);
        }


        //GET
        // Kiểm tra xem khách hàng có tài khoản hay không
        [HttpGet("CheckExists/{customerPhone}")]
        public async Task<ActionResult<Customer>> CheckCustomerAccount(string customerPhone)
        {
            try
            {
                var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerPhone == customerPhone);
                if (customer != null)
                {
                    return Ok(customer);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        // PUT: api/Orders/5
        //Xac nhan don hang
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            //_context.Entry(order).State = EntityState.Modified;
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder == null)
            {
                return NotFound();
            }

            existingOrder.OrderStatusId = order.OrderStatusId; ;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(order);
        }


        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            order.OrderDate = DateTime.Now;
            order.OrderStatusId = 1;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostOrder", new { id = order.OrderId }, order);
        }

        //GET PROCEDURE [statisticOrderOfCus]
        [HttpGet("statisticOrderOfCus")]
        public  ActionResult<IEnumerable<StatisticByCustomerOrder>> GetListStatistic(int month, int year)
        {
            //var order = from o in _context.Orders 
            //            join c in _context.Customers on o.CustomerId equals c.CustomerId
            //            where o.OrderDate!.Value.Month == month 
            //                 && o.OrderDate!.Value.Year == year 
            //                 && o.OrderStatusId == 4
            //                 && o.CustomerId != null
            //             group o by
            //                 select new StatisticByCustomerOrder
            //                 {
            //                     CustomerId = c.CustomerId,
            //                     TotalOrder = _context.Customers.Count()
            //                 }

            var a = _context.Orders
                  .Include(o => o.Customer)
                  .Where(o => o.OrderDate!.Value.Month == month
                          && o.OrderDate.Value.Year == year
                          && o.OrderStatusId == 4
                          && o.CustomerId != null)
                  .GroupBy(o => new { o.CustomerId, o.Customer.CustomerName })
                  .Select(group => new StatisticByCustomerOrder
                  {
                      CustomerId = group.Key.CustomerId,
                      TotalOrder = group.Count(),
                      TotalPrice = group.Sum(o => o.TotalPrice),
                      CustomerName = group.Key.CustomerName,
                  });
            return Ok(a);
        }


        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
