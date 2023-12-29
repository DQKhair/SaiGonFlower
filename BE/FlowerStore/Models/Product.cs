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
            Likes = new HashSet<Like>();
            ProductViews = new HashSet<ProductView>();
            Reviews = new HashSet<Reviews>();
            StaticProducts = new HashSet<StaticProduct>();

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
        public virtual ICollection<Like> Likes { get; set; }
        public virtual ICollection<ProductView> ProductViews { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }

        public virtual ICollection<StaticProduct> StaticProducts { get; set; }



    }
}
