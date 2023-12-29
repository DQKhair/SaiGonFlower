using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Store
    {
        public Store()
        {
            Imports = new HashSet<Import>();
            Orders = new HashSet<Order>();
            StockDetails = new HashSet<StockDetail>();
            StoreDetails = new HashSet<StoreDetail>();
        }

        public int StoreId { get; set; }
        public string? StoreName { get; set; }
        public string? StorePhone { get; set; }
        public string? StoreStreet { get; set; }
        public string? StoreWard { get; set; }
        public string? StoreDistrict { get; set; }
        public string? StoreUserName { get; set; }
        public string? StorePassword { get; set; }
        public bool? StoreStatus { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Import> Imports { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<StockDetail> StockDetails { get; set; }
        public virtual ICollection<StoreDetail> StoreDetails { get; set; }
    }

    public class ProductOfStore
    {
        public int StoreId { get; set; }
        public object? StoreDetail { get; set; }
    }
    public class ProductOfStoreNew
    {
        public int StoreDetailId { get; set; }
        public int? ProductIdStore { get; set; }
        public int? QuantityProduct { get; set; }

    }
}
