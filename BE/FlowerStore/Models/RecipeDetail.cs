namespace FlowerStore.Models
{
    public class RecipeDetail
    {
        public int RecipeDetailId { get; set; }
        public int Quantity { get; set; }
        public int MaterialId { get; set; }
        public int RecipeId { get; set; }

        public virtual Material? Material { get; set; }
        public virtual Recipe? Recipe { get; set; }
    }
}
