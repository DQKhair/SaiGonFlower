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
    public class OrderMethodsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public OrderMethodsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/OrderMethods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMethod>>> GetOrderMethods()
        {
          if (_context.OrderMethods == null)
          {
              return NotFound();
          }
            return await _context.OrderMethods.ToListAsync();
        }

        // GET: api/OrderMethods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMethod>> GetOrderMethod(int id)
        {
          if (_context.OrderMethods == null)
          {
              return NotFound();
          }
            var orderMethod = await _context.OrderMethods.FindAsync(id);

            if (orderMethod == null)
            {
                return NotFound();
            }

            return orderMethod;
        }

        // PUT: api/OrderMethods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMethod(int id, OrderMethod orderMethod)
        {
            if (id != orderMethod.OrderMethodId)
            {
                return BadRequest();
            }

            _context.Entry(orderMethod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMethodExists(id))
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

        // POST: api/OrderMethods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderMethod>> PostOrderMethod(OrderMethod orderMethod)
        {
          if (_context.OrderMethods == null)
          {
              return Problem("Entity set 'FlowerStoreContext.OrderMethods'  is null.");
          }
            _context.OrderMethods.Add(orderMethod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMethod", new { id = orderMethod.OrderMethodId }, orderMethod);
        }

        // DELETE: api/OrderMethods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMethod(int id)
        {
            if (_context.OrderMethods == null)
            {
                return NotFound();
            }
            var orderMethod = await _context.OrderMethods.FindAsync(id);
            if (orderMethod == null)
            {
                return NotFound();
            }

            _context.OrderMethods.Remove(orderMethod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMethodExists(int id)
        {
            return (_context.OrderMethods?.Any(e => e.OrderMethodId == id)).GetValueOrDefault();
        }
    }
}
