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
    public class NewsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public NewsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            var autoUpdate = _context.News.OrderBy(x => x.NewsId).Where(x => x.Status == true).Take(10).ToList();
            foreach (var news in autoUpdate)
            {
                if (news.ExpireDate <= news.NewsDate)
                    news.Status = false;
            }
            _context.SaveChanges();
            var list = _context.News.OrderByDescending(x => x.NewsDate).ToListAsync();
            return await list;
        }

        [HttpGet("/api/News/Web")]
        public ActionResult<IEnumerable<News>> GetNewWebs()
        {
            var list = _context.News.Where(x => x.Status == true).ToList();
            return list;
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            if (_context.News == null)
            {
                return NotFound();
            }
            var news = await _context.News.FindAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // PUT: api/News/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNews(int id, News news)
        {
            if (id != news.NewsId)
            {
                return BadRequest();
            }

            var update = _context.News.Find(id);
            update!.Content = news.Content;
            update!.ExpireDate = news.ExpireDate;
            update.Title = news.Title;

            _context.Entry(update).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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

        // POST: api/News
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<News>> PostNews(News news)
        {

            news.NewsDate = DateTime.Now;
            news.Status = true;
            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNews", new { id = news.NewsId }, news);
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            if (_context.News == null)
            {
                return NotFound();
            }
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsExists(int id)
        {
            return (_context.News?.Any(e => e.NewsId == id)).GetValueOrDefault();
        }
    }
}
