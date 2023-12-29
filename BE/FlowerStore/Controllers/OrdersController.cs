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
using System.Globalization;

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
        [HttpGet("GetListOrder/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(int id)
        {
            var orders = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderStatus).Where(o => o.StoreId == id)
               .Select(o => new OrderNew
               {
                   OrderId = o.OrderId,
                   OrderDate = o.OrderDate,
                   //CustomerName = o.Customer != null ? o.NameCusNonAccount : o.Customer.CustomerName,
                   //CustomerPhone = o.Customer != null ? o.Customer.CustomerPhone : o.PhoneCusNonAccount,
                   CustomerName =  o.NameCusNonAccount,
                   CustomerPhone = o.PhoneCusNonAccount,

                   OrderStatus = o.OrderStatus!.OrderStatusName,
               })
               .ToListAsync();

            return Ok(orders);

        }
        
        // GET: api/Orders
        [HttpGet("GetOrderByStatus/StatusId={statusId}&&StoreId={storeId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrderByStatus(int statusId, int storeId)
        {
            var orders = await _context.Orders.Include(o => o.Store).Include(o => o.Customer)
               .Include(o => o.OrderStatus).Where(x => x.OrderStatusId == statusId && x.StoreId == storeId)
               .Select(o => new OrderByStatusNew
               {
                   OrderId = o.OrderId,
                   OrderDate = o.OrderDate,
                   //CustomerName = o.Customer != null ?  o.Customer.CustomerName : o.NameCusNonAccount,
                   //CustomerPhone = o.Customer != null ? o.Customer.CustomerPhone : o.PhoneCusNonAccount,
                   CustomerName = o.NameCusNonAccount,
                   CustomerPhone = o.PhoneCusNonAccount,
                   OrderStatus = o.OrderStatus.OrderStatusName,
                   StoreId = o.StoreId,
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
            var orderDetail = _context.Orders
               .Include(o => o.OrderDetails).ThenInclude(od => od.Product)
               .Include(o => o.Store)
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

                   //CustomerName = o.Customer != null ? o.Customer.CustomerName : o.NameCusNonAccount,
                   //CustomerPhone = o.Customer != null ? o.Customer.CustomerPhone : o.PhoneCusNonAccount,
                   //CustomerAddress = o.Customer != null ? o.Customer.CustomerAddress : o.AddressCusNonAccount,
                   CustomerId = o.CustomerId,
                   CustomerName = o.NameCusNonAccount,
                   CustomerPhone = o.PhoneCusNonAccount,
                   CustomerAddress = o.AddressCusNonAccount,

                   OrderStatusId = o.OrderStatusId,
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
        //Xac nhan/Huy don hang
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


        //GET [statisticOrderOfCus]
        [HttpGet("statisticOrderOfCus")]
        public  ActionResult<IEnumerable<StatisticByCustomerOrder>> GetListStatistic(int month, int year)
        {
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


        //GET [revenueByMonth]
        [HttpGet("revenueByMonth")]
        public ActionResult<decimal> GetRevenueByMonth(int? month = null, int? year = null)
        {
            if (!month.HasValue)
            {
                month = DateTime.Now.Month;
            }

            if (!year.HasValue)
            {
                year = DateTime.Now.Year;
            }

            var totalRevenue = _context.Orders
                .Where(o => o.OrderDate != null
                    && o.OrderDate.Value.Month == month
                    && o.OrderDate.Value.Year == year
                    && o.OrderStatusId == 4)
                .Sum(o => o.TotalPrice);

            return Ok(totalRevenue);
        }


        //GET orderCountToday
        [HttpGet("orderCountToday")]
        public ActionResult<int> GetOrderCountToday()
        {
            DateTime today = DateTime.Today;

            int orderCount = _context.Orders
                .Count(o => o.OrderDate != null
                    && o.OrderDate.Value.Date == today
                    && o.OrderStatusId == 1);

            return Ok(orderCount);
        }


        //Get revenueByDay
        [HttpGet("revenueByDay")]
        public ActionResult<List<RevenueByDay>> GetRevenueByDay(string startDate, string endDate)
        {
            var parsedStartDate = DateTime.ParseExact(startDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var parsedEndDate = DateTime.ParseExact(endDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            var timeDiff = parsedEndDate.Subtract(parsedStartDate);
            var diffDays = timeDiff.Days;

            var revenueByDay = _context.Orders.Where(o => o.OrderDate != null
                && o.OrderDate.Value >= parsedStartDate
                && o.OrderDate.Value <= parsedEndDate
                && o.OrderStatusId == 4)
               .GroupBy(o => o.OrderDate.Value.Date)
               .Select(g => new RevenueByDay
               {
                  Date = g.Key,
                  OrderCount = g.Count(),
                  TotalRevenue = (decimal)g.Sum(o => o.TotalPrice)
               })
            .ToList();
            return Ok(revenueByDay);
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

        ///
        [HttpPost("PostOrderForCus")]
        public async Task<ActionResult<IEnumerable<Order>>> PostOrderForCus(Order order)
        {
            try
            {
                var _order = new Order();
                _order.OrderDate = DateTime.Now;
                _order.TotalQuantity = order.TotalQuantity;
                _order.TotalPrice = order.TotalPrice;
                _order.NameCusNonAccount = order.NameCusNonAccount;
                _order.PhoneCusNonAccount = order.PhoneCusNonAccount;
                _order.AddressCusNonAccount = order.AddressCusNonAccount;
                _order.CustomerId = order.CustomerId;
                _order.OrderStatusId = 1;
                _order.OrderMethodId = order.OrderMethodId;
                _order.StoreId = order.StoreId;
                _context.Add(_order);
                await _context.SaveChangesAsync();
                return Ok(_order);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("PostOrderDetailForCus")]
        public async Task<ActionResult<IEnumerable<DetailOrderVM>>> PostOrderDetailForCus(DetailOrderVM detailOrderVM)
        {
            try
            {
                if (detailOrderVM != null)
                {
                    foreach (var item in detailOrderVM.listCartItem)
                    {
                        var _orderDetail = new OrderDetail();
                        _orderDetail.OrderDetailId = 0;
                        _orderDetail.OrderId = Convert.ToInt32(detailOrderVM.OrderId);
                        _orderDetail.Quantity = Convert.ToInt32(item.Quantity);
                        _orderDetail.Price = Convert.ToDouble(item.Price);
                        _orderDetail.ProductId = Convert.ToInt32(item.ProductId);
                        _context.OrderDetails.Add(_orderDetail);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(detailOrderVM);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("PutCancelOrderForCus/{orderId}")]
        public async Task<IActionResult> PutCancelOrderForCus(int orderId)
        {
            try
            {
                var _order = _context.Orders.SingleOrDefault(o => o.OrderId == orderId);
                if (_order == null)
                {
                    return BadRequest();
                }
                else
                {
                    _order.OrderStatusId = 5;
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
            }
            catch
            {
                return BadRequest();
            }
        }


        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
