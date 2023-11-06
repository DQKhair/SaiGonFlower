﻿using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Customer
    {
        public Customer()
        {
            DetailVouchers = new HashSet<DetailVoucher>();
            Orders = new HashSet<Order>();
        }

        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerAddress { get; set; }
        public bool? CustomerStatus { get; set; }
        public int? CustomerPoint { get; set; }
        public string? CustomerUserName { get; set; }
        public string? CustomerPassword { get; set; }

        public virtual ICollection<DetailVoucher> DetailVouchers { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
