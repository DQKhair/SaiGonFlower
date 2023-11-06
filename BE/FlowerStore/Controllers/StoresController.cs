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
    public class StoresController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public StoresController(FlowerStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetAllStore()
        {
            try
            {
                var _stores = await _context.Stores.ToListAsync();

                return Ok(_stores);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetStoreById(int id)
        {
            try
            {
                var _store = await _context.Stores.SingleOrDefaultAsync(c => c.StoreId == id);

                return Ok(_store);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Store>>> PostStoreNew(Store store)
        {
            try
            {
                var BcryPass = BCrypt.Net.BCrypt.HashPassword(store.StorePassword);

                var _store = new Store();
                _store.StoreName = store.StoreName;
                _store.StorePhone = store.StorePhone;
                _store.StoreStreet = store.StoreStreet;
                _store.StoreWard = store.StoreWard;
                _store.StoreDistrict = store.StoreDistrict;
                _store.StoreUserName = store.StoreUserName;
                _store.StorePassword = BcryPass;
                _store.StoreStatus = true;
                _store.RoleId = 2;

                _context.Stores.Add(_store);
                await _context.SaveChangesAsync();

                return Ok(_store);
            } catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("ResetPasswordStore/{id}")]
        public async Task<IActionResult> ResetPasswordStore(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StorePassword = BCrypt.Net.BCrypt.HashPassword("sgf@123");
                await _context.SaveChangesAsync();
                return NoContent();

            } catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("StatusStoreOff/{id}")]
        public async Task<IActionResult> UpdateStatusStoreOff(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StoreStatus = false;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("StatusStoreOn/{id}")]
        public async Task<IActionResult> UpdateStatusStoreOn(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if (_store == null)
                {
                    return BadRequest();
                }
                _store.StoreStatus = true;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("UpdateInfoStore/{id}")]
        public async Task<IActionResult> UpdateInfoStore(int id, Store store)
        {
            var _store = await _context.Stores.SingleOrDefaultAsync(s => s.StoreId == id);
            try
            {
                if(_store == null)
                {
                    return BadRequest();
                }
                _store.StoreName = store.StoreName;
                _store.StorePhone = store.StorePhone;
                _store.StoreStreet = store.StoreStreet;
                _store.StoreWard = store.StoreWard;
                _store.StoreDistrict = store.StoreDistrict;
                await _context.SaveChangesAsync();
                return NoContent();
                
            }catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
