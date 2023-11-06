namespace FlowerStore.Temp
{
    public class RecipeDetailMV
    {
        public int RecipeDetailId { get; set; }
        public int[] Quantity { get; set; } = new int[0];
        public int[] MaterialId { get; set; } = new int[0];
        public int RecipeId { get; set; }
    }
}
