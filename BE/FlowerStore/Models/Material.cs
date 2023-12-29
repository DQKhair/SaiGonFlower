using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Material
    {
        public Material()
        {
            ImportDetails = new HashSet<ImportDetail>();
            StockDetails = new HashSet<StockDetail>();
            RecipeDetails = new HashSet<RecipeDetail>();
        }

        public int MaterialId { get; set; }
        public string? MaterialName { get; set; }
        public string? Supplier {  get; set; }
        public int? Quantity { get; set; }

        public virtual ICollection<ImportDetail> ImportDetails { get; set; }
        public virtual ICollection<StockDetail> StockDetails { get; set; }
        public virtual ICollection<RecipeDetail> RecipeDetails { get; set; }

    }
}
