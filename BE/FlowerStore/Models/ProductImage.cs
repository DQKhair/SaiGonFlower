namespace FlowerStore.Models
{
    public class ProductImage
    {
        public string? ProductName { get; set; }
        public double? Price { get; set; }
        public bool? Discount { get; set; }
        public int? CategoryId { get; set; }
        public int RecipeId { get; set; }

        public int StoreId { get; set; }
        public int QuantityToProduce { get; set; }
        public IFormFile? Images { get; set; }
    }
}
