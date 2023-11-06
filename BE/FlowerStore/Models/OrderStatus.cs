using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class OrderStatus
    {
        public OrderStatus()
        {
            Orders = new HashSet<Order>();
        }

        public int OrderStatusId { get; set; }
        public string? OrderStatusName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
