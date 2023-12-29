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
    public class StoreDetailsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public StoreDetailsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/StoreDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreDetail>>> GetStoreDetails()
        {
          if (_context.StoreDetails == null)
          {
              return NotFound();
          }
            return await _context.StoreDetails.ToListAsync();
        }

        // GET: api/StoreDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDetail>> GetStoreDetail(int id)
        {
          if (_context.StoreDetails == null)
          {
              return NotFound();
          }
            var storeDetail = await _context.StoreDetails.FindAsync(id);

            if (storeDetail == null)
            {
                return NotFound();
            }

            return storeDetail;
        }

        // PUT: api/StoreDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreDetail(int id, StoreDetail storeDetail)
        {
            if (id != storeDetail.StoreDetailId)
            {
                return BadRequest();
            }

            _context.Entry(storeDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreDetailExists(id))
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


        // POST: api/StoreDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreDetail>> PostStoreDetail(StoreDetail storeDetail)
        {
          if (_context.StoreDetails == null)
          {
              return Problem("Entity set 'FlowerStoreContext.StoreDetails'  is null.");
          }
            _context.StoreDetails.Add(storeDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoreDetail", new { id = storeDetail.StoreDetailId }, storeDetail);
        }

        // DELETE: api/StoreDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStoreDetail(int id)
        {
            if (_context.StoreDetails == null)
            {
                return NotFound();
            }
            var storeDetail = await _context.StoreDetails.FindAsync(id);
            if (storeDetail == null)
            {
                return NotFound();
            }

            _context.StoreDetails.Remove(storeDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreDetailExists(int id)
        {
            return (_context.StoreDetails?.Any(e => e.StoreDetailId == id)).GetValueOrDefault();
        }
    }
}
