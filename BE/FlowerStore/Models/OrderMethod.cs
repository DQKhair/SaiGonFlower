using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class OrderMethod
    {
        public OrderMethod()
        {
            Orders = new HashSet<Order>();
        }

        public int OrderMethodId { get; set; }
        public string? OrderMethodName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
