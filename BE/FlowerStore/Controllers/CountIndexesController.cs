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
    public class CountIndexesController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public CountIndexesController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/CountIndexes
        [HttpGet]
        public async Task<ActionResult<int>> GetTotalCountMonth()
        {
            if (_context.CountIndex == null)
            {
                return NotFound();
            }

            int total = await _context.CountIndex.SumAsync(c => c.CountMonth);
            return total;
        }

        [HttpGet("full")]
        public async Task<ActionResult<IEnumerable<CountIndex>>> GetCountIndexsFull()
        {
            if (_context.CountIndex == null)
            {
                return NotFound();
            }
            return await _context.CountIndex.ToListAsync();
        }

        //// GET: api/CountIndexes/5
        [HttpGet("month")]
        public async Task<ActionResult<CountIndex>> GetCountIndex([FromQuery] int month, [FromQuery] int year)
        {
            var countIndex = await _context.CountIndex
                .FirstOrDefaultAsync(c => c.Date.Month == month && c.Date.Year == year);

            if (countIndex == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(countIndex);
            }
        }

        //// PUT: api/CountIndexes/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("month")]
        public async Task<IActionResult> PutCountIndex([FromQuery] int month, [FromQuery] int year, [FromBody] CountIndex countIndex1)
        {
            var countIndexes = await _context.CountIndex
                .Where(c => c.Date.Month == month && c.Date.Year == year)
                .ToListAsync();

            if (countIndexes == null || countIndexes.Count == 0)
            {
                return NotFound();
            }
            else if (countIndexes.Count > 1)
            {
                return BadRequest("Multiple records match the query.");
            }

            var countIndex = countIndexes.First(); // or use FirstOrDefault if you want to handle cases with no matching records

            try
            {
                countIndex.CountMonth += 1;
                _context.SaveChanges();
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: api/CountIndexes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CountIndex>> PostCountIndex(CountIndex countIndex)
        {
          if (_context.CountIndex == null)
          {
              return Problem("Entity set 'FlowerStoreContext.CountIndex'  is null.");
          }
            _context.CountIndex.Add(countIndex);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountIndex", new { id = countIndex.Id }, countIndex);
        }

        // DELETE: api/CountIndexes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountIndex(int id)
        {
            if (_context.CountIndex == null)
            {
                return NotFound();
            }
            var countIndex = await _context.CountIndex.FindAsync(id);
            if (countIndex == null)
            {
                return NotFound();
            }

            _context.CountIndex.Remove(countIndex);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CountIndexExists(int id)
        {
            return (_context.CountIndex?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
