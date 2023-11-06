using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;

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

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        //// đăng ký
        //[HttpPost]
        //public async Task<IActionResult> Register(Customer customer)
        //{
        //    // Kiểm tra xem email và số điện thoại đã được sử dụng chưa
        //    var existingUser = await _context.Customers
        //        .FirstOrDefaultAsync(c => c.CustomerPhone == customer.CustomerPhone || c.CustomerUserName == customer.CustomerUserName);

        //    if (existingUser != null)
        //    {
        //        return BadRequest("Email hoặc số điện thoại đã được sử dụng.");
        //    }

        //    // Mã hóa mật khẩu sử dụng BCrypt.Net
        //    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(customer.CustomerPassword);

        //    // Gán mật khẩu đã mã hóa lại cho customer
        //    customer.CustomerPassword = hashedPassword;

        //    // Thêm người dùng mới vào cơ sở dữ liệu
        //    _context.Customers.Add(customer);
        //    await _context.SaveChangesAsync();

        //    return Ok("Đăng ký thành công.");
        //}

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


        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.CustomerId == id)).GetValueOrDefault();
        }
    }
}
