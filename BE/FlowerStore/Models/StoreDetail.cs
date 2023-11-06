using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class StoreDetail
    {
        public int StoreDetailId { get; set; }
        public int? Quantity { get; set; }
        public int? StoreId { get; set; }
        public int? ProductId { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Store? Store { get; set; }
    }
}
