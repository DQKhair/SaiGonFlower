namespace FlowerStore.Models
{
    public class getRecipeDetailById
    {
        public int RecipeDetailId { get; set; }
        public int Quantity { get; set; }
        public int RecipeId { get; set; }   
        public string RecipeName { get; set;} = string.Empty;
        public int MaterialId { get; set; }
        public string MaterialName { get; set; } = string.Empty;
    }
}
