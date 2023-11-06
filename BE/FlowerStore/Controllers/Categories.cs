using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FlowerStore.Models;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Categories : ControllerBase
    {
        private readonly FlowerStoreContext _context;
        public Categories(FlowerStoreContext context)
        {
            _context = context;
        }

        //get
        [HttpGet]
        public IActionResult getCate()
        {
            try
            {
                var cate = _context.Categories.ToList();
                return Ok(cate);
            }
            catch
            {
                return BadRequest();
            }

        }

        //xoa
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var category = _context.Categories.SingleOrDefault(c => c.CategoryId == id);
            try
            {
                if (category == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Categories.Remove(category);
                    _context.SaveChanges();
                    return Ok("Xóa thành công!");
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        //them
        [HttpPost]
        public IActionResult PostCategories(Category cate)
        {
            var category = new Category();
            category.CategoryName = cate.CategoryName;
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        //sua
        [HttpPut("{id}")]
        public IActionResult PutCategory(int id, Category category)
        {
            var _category = _context.Categories.SingleOrDefault(c => c.CategoryId == id);
            if(category != null)
            {
                _category.CategoryName = category.CategoryName;
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
