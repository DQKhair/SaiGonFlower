using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class OrderDetail
    {
        public int OrderDetailId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }

        public virtual Order? Order { get; set; }
        public virtual Product? Product { get; set; }
    }

    public partial class OrderDetailNewById
    {
        public int OrderDetailId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }

    }
}
