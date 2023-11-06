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
        }

        public int MaterialId { get; set; }
        public string? MaterialName { get; set; }

        public virtual ICollection<ImportDetail> ImportDetails { get; set; }
        public virtual ICollection<StockDetail> StockDetails { get; set; }
        public virtual ICollection<RecipeDetail> RecipeDetails { get; set; }

    }
}
