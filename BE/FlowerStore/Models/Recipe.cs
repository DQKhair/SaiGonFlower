using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Recipe
    {
        public Recipe()
        {
            Products = new HashSet<Product>();
            RecipeDetail = new HashSet<RecipeDetail>();
        }

        public int RecipeId { get; set; }
        public string? RecipeName { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<RecipeDetail> RecipeDetail { get; set; }
    }
}
