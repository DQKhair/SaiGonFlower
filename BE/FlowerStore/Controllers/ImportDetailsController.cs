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
    public class ImportDetailsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public ImportDetailsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/ImportDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportDetail>>> GetImportDetails()
        {
            if (_context.ImportDetails == null)
            {
                return NotFound();
            }
            return await _context.ImportDetails.ToListAsync();
        }

        // GET: api/ImportDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Import_GetImportDetails>>> GetImportDetail(int id)
        {

            var details = await _context.ImportDetails
                        .Include(x => x.Import)
                        .Include(y => y.Material)
                        .Where(x => x.ImportId == id)
                        .Select(x => new Import_GetImportDetails
                        {
                            ImportDetailId = x.ImportDetailId,
                            ImportId = x.ImportId,
                            Quantity = x.Quantity,
                            MaterialId = x.MaterialId,
                            MaterialName = x.Material!.MaterialName
                        }).ToListAsync();

            if (details == null)
            {
                return NotFound();
            }

            return details;
        }

        // PUT: api/ImportDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImportDetail(int id, ImportDetail importDetail)
        {
            if (id != importDetail.ImportDetailId)
            {
                return BadRequest();
            }

            _context.Entry(importDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportDetailExists(id))
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

        // POST: api/ImportDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ImportDetail>> PostImportDetail(ImportDetails_Temp temp)
        {
            ImportDetail importDetail = new ImportDetail();


            for (int i = 0; i < temp.MaterialId?.Length; i++)
            {
                importDetail.ImportDetailId = 0;
                importDetail.ImportId = temp.ImportId;
                importDetail.MaterialId = temp.MaterialId[i];
                importDetail.Quantity = temp.Quantity?[i];
                _context.ImportDetails.Add(importDetail);
                await _context.SaveChangesAsync();

            }
            return CreatedAtAction("GetImportDetail", new { id = importDetail.ImportDetailId }, importDetail);
        }

        // DELETE: api/ImportDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImportDetail(int id)
        {
            if (_context.ImportDetails == null)
            {
                return NotFound();
            }
            var importDetail = await _context.ImportDetails.FindAsync(id);
            if (importDetail == null)
            {
                return NotFound();
            }
            _context.ImportDetails.Remove(importDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImportDetailExists(int id)
        {
            return (_context.ImportDetails?.Any(e => e.ImportDetailId == id)).GetValueOrDefault();
        }
    }
}
