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
    public class DetailVouchersController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public DetailVouchersController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/DetailVouchers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailVoucher>>> GetDetailVouchers()
        {
          if (_context.DetailVouchers == null)
          {
              return NotFound();
          }
            return await _context.DetailVouchers.ToListAsync();
        }

        [HttpGet("{voucherId}/{customerId}")]
        public async Task<IActionResult> GetVoucherFindIdAndCusId(int voucherId, int customerId)
        {
            var _detailVoucher = _context.DetailVouchers.FirstOrDefaultAsync(dv => dv.VoucherId == voucherId && dv.CustomerId == customerId);
            try
            {
                if(_detailVoucher == null )
                {
                    return NotFound();
                }
                return Ok(await _detailVoucher);
            }catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{voucherId}/{customerId}")]
        public ActionResult UpdateVoucherIdAndCusId(int voucherId, int customerId, DetailVoucher detailVoucher)
        {
            var _detailVoucher = _context.DetailVouchers.FirstOrDefault(dv => dv.VoucherId == voucherId && dv.CustomerId == customerId);
            try
            {
                if (_detailVoucher == null)
                {
                    return NotFound();
                }
                _detailVoucher.Quantity = detailVoucher.Quantity;
                _context.SaveChanges();

                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        public async Task<IActionResult> addDetailVoucher(DetailVoucher detailVoucher)
        {
            try
            {
                _context.Add(detailVoucher);
                await _context.SaveChangesAsync();
                return Ok(detailVoucher);
            }catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
