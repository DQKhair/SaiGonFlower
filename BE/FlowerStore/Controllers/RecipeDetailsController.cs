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
    public class RecipeDetailsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public RecipeDetailsController(FlowerStoreContext context)
        {
            _context = context;
        }

        // GET: api/RecipeDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeDetail>>> GetRecipeDetails()
        {
          if (_context.RecipeDetails == null)
          {
              return NotFound();
          }
            return await _context.RecipeDetails.ToListAsync();
        }

        [HttpGet("getRecipeDetailAll/{recipeId}")]
        public async Task<ActionResult<IEnumerable<RecipeDetail>>> getRecipeDetailAll(int recipeId)
        {
            var _recipeDetailById = await _context.RecipeDetails
            .Include(m => m.Material)
            .Include(r => r.Recipe)
            .Where(r => r.RecipeId == recipeId)
            .Select(s=> new getRecipeDetailById
            {
                RecipeDetailId = s.RecipeId,
                Quantity = s.Quantity,
                RecipeId = s.RecipeId,
                RecipeName = s.Recipe.RecipeName,
                MaterialId = s.MaterialId,
                MaterialName = s.Material.MaterialName
            }).ToListAsync();
            return Ok(_recipeDetailById);
        }

        [HttpPost("/PostRecipeAndRecipeDetail")]
        public async Task<ActionResult<IEnumerable<RecipeDetail>>> PostRecipeAndRecipeDetail(RecipeDetailMV temp)
        {
            try
            {

                for (int i = 0; i < temp.MaterialId.Length; i++)
                {
                    var recipedetail = new RecipeDetail();
                    recipedetail.RecipeId = temp.RecipeId;
                    recipedetail.MaterialId = temp.MaterialId[i];
                    recipedetail.Quantity = temp.Quantity[i];
                    _context.RecipeDetails.Add(recipedetail);
                }
                await _context.SaveChangesAsync();
                return Ok(temp);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("/PutRecipeAndRecipeDetail/{recipeId}")]
        public async Task<ActionResult<IEnumerable<RecipeDetail>>> PostRecipeAndRecipeDetail(int recipeId, RecipeDetailMV temp)
        {
            try
            {

                var _recipeDetailEdit = await _context.RecipeDetails.Where(r => r.RecipeId == recipeId).ToListAsync();
                for(int i = 0;i < temp.MaterialId.Length;i++)
                {
                    _recipeDetailEdit[i].RecipeId = temp.RecipeId;
                    _recipeDetailEdit[i].MaterialId = temp.MaterialId[i];
                    _recipeDetailEdit[i].Quantity = temp.Quantity[i];
                    
                }    
                await _context.SaveChangesAsync();
                return Ok(temp);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private bool RecipeDetailExists(int id)
        {
            return (_context.RecipeDetails?.Any(e => e.RecipeDetailId == id)).GetValueOrDefault();
        }
    }
}
