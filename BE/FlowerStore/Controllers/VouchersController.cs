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
    public class VouchersController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public VouchersController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Vouchers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voucher>>> GetVouchers()
        {
          if (_context.Vouchers == null)
          {
              return NotFound();
          }
            return await _context.Vouchers.ToListAsync();
        }

        // GET: api/Vouchers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voucher>> GetVoucher(int id)
        {
          if (_context.Vouchers == null)
          {
              return NotFound();
          }
            var voucher = await _context.Vouchers.FindAsync(id);

            if (voucher == null)
            {
                return NotFound();
            }

            return voucher;
        }

        // PUT: api/Vouchers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoucher(int id, Voucher voucher)
        {
            var _voucher = _context.Vouchers.SingleOrDefault(v => v.VoucherId == id);  
            


            try
            {
                if (_voucher == null)
                {
                    return NotFound();
                }
                _voucher.VoucherName = voucher.VoucherName;
                _voucher.VoucherPoint = voucher.VoucherPoint;
                _voucher.VoucherValue = voucher.VoucherValue;
                _voucher.VoucherQuantity = voucher.VoucherQuantity;
                _voucher.DateExpire = voucher.DateExpire;
                _voucher.CompanyId = voucher.CompanyId;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoucherExists(id))
                {
                    return BadRequest();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }

        }

        // POST: api/Vouchers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Voucher>> PostVoucher(Voucher voucher)
        {
          if (_context.Vouchers == null)
          {
              return Problem("Entity set 'FlowerStoreContext.Vouchers'  is null.");
          }
            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoucher", new { id = voucher.VoucherId }, voucher);
        }

        // DELETE: api/Vouchers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            if (_context.Vouchers == null)
            {
                return NotFound();
            }
            var voucher = await _context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return NotFound();
            }

            _context.Vouchers.Remove(voucher);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("/UpdateQuantityVoucher/{id}")]
        public async Task<IActionResult> UpdateQuantityVoucher(int id, Voucher voucher)
        {
            var _voucher = await _context.Vouchers.SingleOrDefaultAsync(v => v.VoucherId == id);
            try
            {
                int quantityUpdate = Convert.ToInt32(voucher.VoucherQuantity);
                if (_voucher == null)
                {
                    return NotFound();
                }
                _voucher.VoucherQuantity = Convert.ToInt32(_voucher.VoucherQuantity - quantityUpdate);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        private bool VoucherExists(int id)
        {
            return (_context.Vouchers?.Any(e => e.VoucherId == id)).GetValueOrDefault();
        }
    }
}
