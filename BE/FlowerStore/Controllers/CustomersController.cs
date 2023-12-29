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
    public class CustomersController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public CustomersController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
          if (_context.Customers == null)
          {
              return NotFound();
          }
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
          if (_context.Customers == null)
          {
              return NotFound();
          }
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

      

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customerM)
        {
            try
            {
                // Kiểm tra trùng lặp của username
                if (_context.Customers.Any(c => c.CustomerUserName == customerM.CustomerUserName))
                {
                    return BadRequest("Username đã tồn tại");
                }

                // Kiểm tra trùng lặp của phone
                if (_context.Customers.Any(c => c.CustomerPhone == customerM.CustomerPhone))
                {
                    return BadRequest("Số điện thoại đã tồn tại");
                }

                // Mật khẩu sẽ được mã hóa nếu không có trùng lặp
                var customer = new Customer
                {
                    CustomerName = customerM.CustomerName,
                    CustomerPhone = customerM.CustomerPhone,
                    CustomerStatus = true,
                    CustomerPoint = 0,
                    CustomerUserName = customerM.CustomerUserName,
                    CustomerPassword = customerM.CustomerPassword  // Đây là mật khẩu chưa mã hóa
                };

                // Mã hóa mật khẩu bằng BCrypt.Net
                customer.CustomerPassword = BCrypt.Net.BCrypt.HashPassword(customer.CustomerPassword);

                _context.Add(customer);
                await _context.SaveChangesAsync();

                // Xóa mật khẩu chưa mã hóa trước khi trả về đối tượng
                customer.CustomerPassword = null;

                return Ok(customer);
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] CustomerUpdateModel updateModel)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy khách hàng
            }

            // Cập nhật thông tin khách hàng chỉ nếu các thuộc tính không null
            if (updateModel.CustomerName != null)
            {
                customer.CustomerName = updateModel.CustomerName;
            }

            if (updateModel.CustomerPhone != null)
            {
                customer.CustomerPhone = updateModel.CustomerPhone;
            }

            if (updateModel.CustomerAddress != null)
            {
                customer.CustomerAddress = updateModel.CustomerAddress;
            }

            _context.SaveChanges(); // Lưu các thay đổi vào cơ sở dữ liệu

            return Ok(); // Trả về 200 OK nếu cập nhật thành công
        }


        [HttpPut("ResetPasswordCustomer/{id}")]
        public async Task<IActionResult> ResetPasswordStore(int id, Store store)
        {
            var _store = await _context.Customers.SingleOrDefaultAsync(s => s.CustomerId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.CustomerPassword = BCrypt.Net.BCrypt.HashPassword("kh@123");
                await _context.SaveChangesAsync();
                return NoContent();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}/changepassword")]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordModel changePasswordModel)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
            {
                return NotFound();
            }

            // Kiểm tra mật khẩu hiện tại
            if (!BCrypt.Net.BCrypt.Verify(changePasswordModel.CurrentPassword, customer.CustomerPassword))
            {
                return BadRequest("Mật khẩu hiện tại không đúng");
            }

            // Mã hóa mật khẩu mới
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(changePasswordModel.NewPassword);

            // Cập nhật mật khẩu trong cơ sở dữ liệu
            customer.CustomerPassword = hashedPassword;

            _context.SaveChanges();

            return Ok("Mật khẩu đã được thay đổi thành công");
        }
       
        //Khai
        [HttpPut("ChangePoint/{id}")]
        public async Task<IActionResult> HandlePointChange(int id, Customer customer)
        {
            var _customer = _context.Customers.Where(c => c.CustomerId == id).FirstOrDefault();
            try
            {

                if (_customer == null)
                {
                    return NotFound();
                }
                _customer.CustomerPoint = customer.CustomerPoint;
                await _context.SaveChangesAsync();
                return NoContent();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }


        //Customer history and order detail
        [HttpGet("GetInfoCusById/{id}")]
        public async Task<IActionResult> GetInfoCusById(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var _customer = await _context.Customers.Where(c => c.CustomerId == id).FirstOrDefaultAsync();
            return Ok(_customer);
        }

        [HttpGet("GetOrderCusById/{id}")]
        public async Task<IActionResult> GetOrderCusById(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var _order = await _context.Orders.Where(c => c.CustomerId == id && c.OrderStatusId == 4 || c.OrderStatusId == 5 || c.OrderStatusId == 6).Include(m => m.OrderMethod).Include(s => s.OrderStatus).ToListAsync();
            var _orderForCusList = new List<GetOrderForCus>();
            foreach (var item in _order)
            {
                var orderForCus = new GetOrderForCus
                {
                    OrderId = item.OrderId,
                    OrderDate = item.OrderDate,
                    TotalQuantity = item.TotalQuantity,
                    TotalPrice = item.TotalPrice,
                    NameCusNonAccount = item.NameCusNonAccount,
                    PhoneCusNonAccount = item.PhoneCusNonAccount,
                    AddressCusNonAccount = item.AddressCusNonAccount,
                    CustomerId = item.CustomerId,
                    OrderStatusId = item.OrderStatusId,
                    StatusName = item.OrderStatus!.OrderStatusName!,
                    OrderMethodId = item.OrderMethodId,
                    MethodName = item.OrderMethod!.OrderMethodName!,
                    StoreId = item.StoreId
                };
                _orderForCusList.Add(orderForCus);
            }
            return Ok(_orderForCusList);
        }

        [HttpGet("GetOrderTrackingCusById/{id}")]
        public async Task<IActionResult> GetOrderTrackingCusById(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var _order = await _context.Orders.Where(c => c.CustomerId == id && c.OrderStatusId != 4 && c.OrderStatusId != 5 && c.OrderStatusId != 6).Include(m => m.OrderMethod).Include(s => s.OrderStatus).ToListAsync();
            var _orderForCusList = new List<GetOrderForCus>();
            foreach (var item in _order)
            {
                var orderForCus = new GetOrderForCus
                {
                    OrderId = item.OrderId,
                    OrderDate = item.OrderDate,
                    TotalQuantity = item.TotalQuantity,
                    TotalPrice = item.TotalPrice,
                    NameCusNonAccount = item.NameCusNonAccount,
                    PhoneCusNonAccount = item.PhoneCusNonAccount,
                    AddressCusNonAccount = item.AddressCusNonAccount,
                    CustomerId = item.CustomerId,
                    OrderStatusId = item.OrderStatusId,
                    StatusName = item.OrderStatus!.OrderStatusName!,
                    OrderMethodId = item.OrderMethodId,
                    MethodName = item.OrderMethod!.OrderMethodName!,
                    StoreId = item.StoreId
                };
                _orderForCusList.Add(orderForCus);
            }
            return Ok(_orderForCusList);
        }

        [HttpGet("GetOrderDetailCusById/{orderId}")]
        public async Task<ActionResult> GetOrderDetailCusById(int? orderId)
        {
            if (orderId == null)
            {
                return NotFound();
            }
            var _order = await _context.OrderDetails.Where(c => c.OrderId == orderId).Include(p => p.Product).Include(o => o.Order).Include(c => c.Order!.Customer).ToListAsync();
            var _orderDetailList = new List<GetOrderDetailForCus>();
            foreach (var item in _order)
            {
                var orderDetailForCus = new GetOrderDetailForCus
                {
                    OrderDetailId = item.OrderDetailId,
                    Quantity = item.Quantity,
                    Price = item.Price,
                    OrderId = item.OrderId,
                    ProductId = item.ProductId,
                    ProductName = item.Product!.ProductName!,
                    CustomerName =item.Order?.NameCusNonAccount??item.Order?.Customer?.CustomerName??"",
                    CustomerAddress = item.Order?.AddressCusNonAccount??item.Order?.Customer?.CustomerAddress ?? "",
                    CustomerPhone = item.Order?.PhoneCusNonAccount?? item.Order?.Customer?.CustomerPhone ?? "",
                    CustomerId = item.Order?.CustomerId
                };
                _orderDetailList.Add(orderDetailForCus);
            }
            return Ok(_orderDetailList);
        }
        [HttpGet("GetOrderTracking/{orderId}")]
        public async Task<IActionResult> GetOrderTracking(int? orderId)
        {
            if (orderId == null)
            {
                return NotFound();
            }
            var _order = await _context.Orders.SingleOrDefaultAsync(o => o.OrderId == orderId);
            return Ok(_order);
        }
        //End Customer history and order detail


        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.CustomerId == id)).GetValueOrDefault();
        }
    }
}
