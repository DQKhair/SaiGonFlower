using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class StockDetail
    {
        public int StockDetailId { get; set; }
        public int? Quantity { get; set; }
        public int? StoreId { get; set; }
        public int? MaterialId { get; set; }

        public virtual Material? Material { get; set; }

        public virtual Store? Store { get; set; }
    }
}
