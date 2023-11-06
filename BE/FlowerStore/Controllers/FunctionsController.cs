using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using System.Security.Claims;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public FunctionsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Functions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Function>>> GetFunctions()
        {
            // Lấy vai trò của người dùng từ token (nếu đã được đăng nhập)
            var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            if (userRole == null)
            {
                return Forbid(); // Không có quyền truy cập nếu không có vai trò
            }

            // Truy vấn cơ sở dữ liệu để lấy danh sách chức năng cho vai trò
            var functions = await _context.Functions
                .Where(f => f.Role.RoleName == userRole)
                .Select(f => new
                {
                    f.FunctionId,
                    f.FunctionName,
                    f.Route
                    
                })
                .ToListAsync();

            if (functions.Count == 0)
            {
                return NotFound(); // Không tìm thấy chức năng cho vai trò
            }

            return Ok(functions);
        }

        // GET: api/Functions/5
        [HttpGet("{id}")]
        public IActionResult GetFunction(int id)
        {
            if (_context.Functions == null)
            {
                return NotFound();
            }
            var function = _context.Functions.Where(f => f.RoleId == id).ToList();

            if (function == null)
            {
                return NotFound();
            }

            return Ok(function);
        }

        // PUT: api/Functions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFunction(int id, Function function)
        {
            if (id != function.FunctionId)
            {
                return BadRequest();
            }

            _context.Entry(function).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FunctionExists(id))
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

        // POST: api/Functions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Function>> PostFunction(Function function)
        {
            if (_context.Functions == null)
            {
                return Problem("Entity set 'FlowerStoreContext.Functions'  is null.");
            }
            _context.Functions.Add(function);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFunction", new { id = function.FunctionId }, function);
        }

        // DELETE: api/Functions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFunction(int id)
        {
            if (_context.Functions == null)
            {
                return NotFound();
            }
            var function = await _context.Functions.FindAsync(id);
            if (function == null)
            {
                return NotFound();
            }

            _context.Functions.Remove(function);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FunctionExists(int id)
        {
            return (_context.Functions?.Any(e => e.FunctionId == id)).GetValueOrDefault();
        }
    }
}
