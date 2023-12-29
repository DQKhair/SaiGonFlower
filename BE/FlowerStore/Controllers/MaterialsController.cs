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
    public class MaterialsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public MaterialsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Materials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterials()
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }
            return await _context.Materials.ToListAsync();
        }

        // GET: api/Materials/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }
            var material = await _context.Materials.FindAsync(id);

            if (material == null)
            {   
                return NotFound();
            }

            return material;
        }

        // PUT: api/Materials/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Material>>> PutMaterial(int id, Material material)
        {
            if (id != material.MaterialId)
            {
                return BadRequest();
            }

            var oldMaterial = _context.Materials.Find(id);
            oldMaterial!.MaterialName = material.MaterialName;

            _context.Entry(oldMaterial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return await _context.Materials.ToListAsync();
        }

        // POST: api/Materials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Material>> PostMaterial(Material material)
        {
            if (_context.Materials == null)
            {
                return Problem("Entity set 'FlowerStoreContext.Materials'  is null.");
            }
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterial", new { id = material.MaterialId }, material);
        }

        // DELETE: api/Materials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }

            var material = await _context.Materials.FindAsync(id);
            
            if (material == null)
            {
                return NotFound();
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaterialExists(int id)
        {
            return (_context.Materials?.Any(e => e.MaterialId == id)).GetValueOrDefault();
        }
    }
}
