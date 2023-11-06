using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using FlowerStore.Temp;
using System.Security.Claims;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockDetailsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public StockDetailsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/StockDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockDetail>>> GetStockDetails()
        {



            return await _context.StockDetails.ToListAsync();
        }

        // GET: api/StockDetails/5
        [HttpGet("GetStockDetailByStore/{id}")]
        public async Task<ActionResult<IEnumerable<StockDetails_Temp>>> GetStockDetailByStore(int id)
        {


            var newList = from sd in _context.StockDetails
                          join s in _context.Stores on sd.StoreId equals s.StoreId
                          join m in _context.Materials on sd.MaterialId equals m.MaterialId
                          where sd.StoreId == id
                          select new StockDetails_Temp
                          {
                              StockDetailId = sd.StockDetailId,
                              MaterialId = m.MaterialId,
                              MaterialName = m.MaterialName,
                              StoreId = s.StoreId,
                              StoreName = s.StoreName,
                              Quantity = sd.Quantity
                          };
            if (newList == null)
            {
                return NotFound();
            }

            return await newList.ToListAsync();
        }

        // PUT: api/StockDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutStockDetail(int id, PUT_StockDetails stockDetail)
        {
            return Ok();
        }

        // POST: api/StockDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockDetail>> PostStockDetail(PUT_StockDetails stockDetail)
        {
            {
                StockDetail sd = new StockDetail();

                //var checkStoreId = _context.StockDetails.Where(x => x.StoreId == stockDetail.StoreId).SingleOrDefaultAsync();


                for (var i = 0; i < stockDetail.MaterialId?.Length; i++)
                {

                    if (_context.StockDetails.Where(x => x.StoreId == stockDetail.StoreId && x.MaterialId == stockDetail.MaterialId[i]).SingleOrDefault() == null)
                    {
                        sd.StockDetailId = 0;
                        sd.MaterialId = stockDetail.MaterialId[i];
                        sd.Quantity = stockDetail.Quantity?[i];
                        sd.StoreId = stockDetail.StoreId;
                        _context.Add(sd);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        _context.Database.ExecuteSqlInterpolated($"UpdateStockDetails {stockDetail.StoreId}, {stockDetail.MaterialId[i]}, {stockDetail.Quantity?[i]}");
                    }
                }
                return Ok(sd);
            }
        }

        // DELETE: api/StockDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockDetail(int id)
        {
            if (_context.StockDetails == null)
            {
                return NotFound();
            }
            var stockDetail = await _context.StockDetails.FindAsync(id);
            if (stockDetail == null)
            {
                return NotFound();
            }

            _context.StockDetails.Remove(stockDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockDetailExists(int id)
        {
            return (_context.StockDetails?.Any(e => e.StockDetailId == id)).GetValueOrDefault();
        }
    }
}
