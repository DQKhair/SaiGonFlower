using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Reviews = new HashSet<Reviews>();
        }

        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? TotalQuantity { get; set; }
        public double? TotalPrice { get; set; }
        public string? NameCusNonAccount { get; set; }
        public string? PhoneCusNonAccount { get; set; }
        public string? AddressCusNonAccount { get; set; }
        public int? CustomerId { get; set; }
        public int? OrderStatusId { get; set; }
        public int? OrderMethodId { get; set; }
        public int? StoreId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual OrderMethod? OrderMethod { get; set; }
        public virtual OrderStatus? OrderStatus { get; set; }
        public virtual Store? Store { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }

    }
    public class OrderNew
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? FormattedOrderDate => OrderDate?.ToString("dd/MM/yyyy HH:mm:ss");
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? OrderStatus { get; set; }
        public int? StoreId { get; internal set; }

    }

    public class OrderByStatusNew
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? FormattedOrderDate => OrderDate?.ToString("dd/MM/yyyy HH:mm:ss");
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? OrderStatus { get; set; }
        public int? StoreId { get; internal set; }
    }

    public class OrderDetailById
    {
        public int OrderId { get; set; }
        public int OrderDetailId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public string? ProductName { get; set; }
        public int? TotalQuantity { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? FormattedOrderDate => OrderDate?.ToString("dd/MM/yyyy HH:mm:ss");
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerAddress { get; set; }
        public int? OrderStatusId { get; set; }
        public string? OrderStatusName { get; set; }
        public string? OrderMethodName { get; set; }
        public string? StoreName { get; set; }
        public object? OrderDetail { get; internal set; }
        public int? CustomerId { get; internal set; }
    }

}
