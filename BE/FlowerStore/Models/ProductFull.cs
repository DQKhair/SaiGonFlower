using System.ComponentModel.DataAnnotations;

namespace FlowerStore.Models
{
    public class ProductFull
    {
        [Key]
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public double? Price { get; set; }
        public bool? Discount { get; set; }
        public string? Image1 { get; set; }
        //public string? Image3 { get; set; }
        //public string? Image2 { get; set; }
        public int? CategoryId { get; set; }
        public int? RecipeId { get; set; }

        public string? CategoryName { get; set; }
        public string? RecipeName { get; set; }
        public string? StoreName { get; set; }

        public int StoreId { get; set; }

        public string? StoreDistrict { get; set; }

        public int? Quantity { get; set; }
    }
}
