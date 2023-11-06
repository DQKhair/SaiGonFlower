using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetail>();
            StoreDetails = new HashSet<StoreDetail>();
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public double? Price { get; set; }
        public bool? Discount { get; set; }
        public string? Image1 { get; set; }
        //public string? Image3 { get; set; }
        //public string? Image2 { get; set; }
        public int? CategoryId { get; set; }
        public int? RecipeId { get; set; }


        public virtual Category? Category { get; set; }
        public virtual Recipe? Recipe { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<StoreDetail> StoreDetails { get; set; }
    }
}
