using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowerStore.Models;
using FlowerStore.Temp;
using System.Collections;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public LikesController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/Likes
        [HttpGet("id")]
        public ActionResult<Like> GetLike(Like like)
        {

            var find = _context.Likes.Where(x => x.ProductId == like.ProductId).Where(x => x.CustomerId == x.CustomerId).SingleOrDefault();

            if (find == null)
            {
                return NotFound();
            }

            return find;

        }

        //GET: api/List/5
        [HttpGet("List/{id}")]
        public async Task<ActionResult<IEnumerable<LikeByCustomer>>> List(int? id)
        {
            if (_context.Likes == null || id == null)
            {
                return NotFound();
            }
            var like = await _context.Likes.Include(l => l.Product).Where(l => l.CustomerId == id && l.LikeStatus == true)
                .Select(lbc =>  new LikeByCustomer {
                    LikeId = lbc.LikeId!,
                    ProductId = lbc.ProductId!,
                    CustomerId = lbc.CustomerId!,
                    LikeStatus = lbc.LikeStatus!,
                    Image1 = lbc.Product!.Image1,
                    ProductName = lbc.Product!.ProductName,
                    Price = lbc.Product!.Price,

                }).ToListAsync();

            if (like == null)
            {
                return NotFound();
            }

            return like;
        }

        // PUT: api/Likes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<ActionResult> PutLike(Like like)
        {
            if(like == null)
            {
                return NotFound();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync($"UpdateLikeStatus {like.CustomerId}, {like.ProductId}");
            

            return NoContent();
        }

        // POST: api/Likes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Like>> PostLike(Like like)
        {
          if (_context.Likes == null)
          {
              return Problem("Entity set 'FlowerStoreContext.Like'  is null.");
          }

            var check = _context.Likes.Where(x => x.ProductId == like.ProductId && x.CustomerId == like.CustomerId).SingleOrDefault();
            if (check != null)
                await _context.Database.ExecuteSqlInterpolatedAsync($"ChangeLikeStatus {like.CustomerId}, {like.ProductId}");
            else
            {
                _context.Likes.Add(like);
                await _context.SaveChangesAsync();

            }

            return CreatedAtAction("GetLike", new { id = like.LikeId }, like);
        }

        // DELETE: api/Likes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            if (_context.Likes == null)
            {
                return NotFound();
            }
            var like = await _context.Likes.FindAsync(id);
            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LikeExists(int id)
        {
            return (_context.Likes?.Any(e => e.LikeId == id)).GetValueOrDefault();
        }
    }
}
