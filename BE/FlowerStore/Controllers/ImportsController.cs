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
    public class ImportsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public ImportsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Imports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Import_Temp>>> GetImports()
        {

            var list = await _context.Imports.Include(x => x.Iestatus).Select(x => new Import_Temp
            {
                ImportId = x.ImportId,
                CreatedDate = x.CreatedDate,
                IestatusId = x.IestatusId,
                TotalQuantity = x.TotalQuantity,
                IestatusName = x.Iestatus!.IestatusName,
                StoreId = x.StoreId,
            }).ToListAsync();

            if (list == null)
                return NotFound();

            return list;
        }

        // GET: api/Imports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Import_Temp>>> GetImport(int id)
        {

            var temp = await _context.Imports
                .Include(x => x.Store)
                .Include(y => y.Iestatus)
                .Where(x => x.StoreId == id)
                .Select(x => new Import_Temp
                {
                    ImportId = x.ImportId,
                    IestatusId = x.IestatusId,
                    CreatedDate = x.CreatedDate,
                    TotalQuantity = x.TotalQuantity,
                    IestatusName = x.Iestatus!.IestatusName,
                    StoreId = x.StoreId,
                }).ToListAsync();

            if (temp == null)
            {
                return NotFound();
            }

            return temp;
        }

        [HttpGet("GetImportByStatus/{id}")]
        public async Task<ActionResult<IEnumerable<Import_Temp>>> GetImportByStatus(int id)
        {

            var temp = await _context.Imports
                .Include(x => x.Store)
                .Include(y => y.Iestatus)
                .Where(x => x.IestatusId == id)
                .Select(x => new Import_Temp
                {
                    ImportId = x.ImportId,
                    IestatusId = x.IestatusId,
                    CreatedDate = x.CreatedDate,
                    TotalQuantity = x.TotalQuantity,
                    IestatusName = x.Iestatus!.IestatusName,
                    StoreId = x.StoreId,
                }).ToListAsync();

            if (temp == null)
            {
                return NotFound();
            }

            return temp;
        }

        // PUT: api/Imports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImport(int id, Import import)
        {
            if (id != import.ImportId)
            {
                return BadRequest();
            }
            if (import.IestatusId == 2)
            {
                import.ExportDate = DateTime.Now;
                await _context.Database.ExecuteSqlInterpolatedAsync($"UpdateImportStatus {id} ,{import.IestatusId}, {import.ExportDate}");
            }
            else if (import.IestatusId == 3)
            {
                import.ImportDate = DateTime.Now;
                await _context.Database.ExecuteSqlInterpolatedAsync($"UpdateImportStatus {id} ,{import.IestatusId}, {import.ImportDate}");
            }


            return Ok(import);
        }

        // POST: api/Imports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Import>> PostImport(Import import)
        {
            import.CreatedDate = DateTime.Now;
            import.ImportDate = null;
            import.IestatusId = 1;

            _context.Imports.Add(import);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImport", new { id = import.ImportId }, import);
        }

        // DELETE: api/Imports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImport(int id)
        {
            if (_context.Imports == null)
            {
                return NotFound();
            }
            var import = await _context.Imports.FindAsync(id);
            if (import == null)
            {
                return NotFound();
            }

            _context.Imports.Remove(import);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImportExists(int id)
        {
            return (_context.Imports?.Any(e => e.ImportId == id)).GetValueOrDefault();
        }
    }
}
