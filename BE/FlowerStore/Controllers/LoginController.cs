using FlowerStore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public LoginController(FlowerStoreContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid login request");
            }

            // Kiểm tra tài khoản trong bảng Company
            var company = _context.Companies.FirstOrDefault(c => c.CompanyUserName == request.UserName);
            if (company != null && BCrypt.Net.BCrypt.Verify(request.Password, company.PassWordCompany))
            {
                var role = "Company";
                return GenerateAndReturnToken(request.UserName, role, company.CompanyId.ToString());
            }

            // Kiểm tra tài khoản trong bảng Store
            var store = _context.Stores.FirstOrDefault(s => s.StoreUserName == request.UserName);
            if (store != null && BCrypt.Net.BCrypt.Verify(request.Password, store.StorePassword) && store.StoreStatus == true)
            {
                var role = "Store";
                return GenerateAndReturnToken(request.UserName, role, store.StoreId.ToString());
            }

            // Kiểm tra tài khoản trong bảng Customer
            var customer = _context.Customers.FirstOrDefault(cust => cust.CustomerUserName == request.UserName);
            if (customer != null && BCrypt.Net.BCrypt.Verify(request.Password, customer.CustomerPassword))
            {
                var role = "Customer";
                return GenerateAndReturnToken(request.UserName, role, customer.CustomerId.ToString());
            }

            // Nếu không tìm thấy tài khoản phù hợp
            return BadRequest("Invalid credentials");
        }

        private IActionResult GenerateAndReturnToken(string userName, string role, string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = GetSymmetricSecurityKey();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, userName),
            new Claim(ClaimTypes.Role, role),
            new Claim("UserId", userId)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

        private SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            byte[] secretKeyBytes;
            using (var cryptoProvider = new RNGCryptoServiceProvider())
            {
                secretKeyBytes = new byte[32]; // Độ dài khóa 256 bits
                cryptoProvider.GetBytes(secretKeyBytes);
            }

            return new SymmetricSecurityKey(secretKeyBytes);
        }
    }
}
