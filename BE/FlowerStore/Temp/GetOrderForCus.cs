using System.Security;

namespace FlowerStore.Temp
{
    public class GetOrderForCus
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? TotalQuantity { get; set; }
        public double? TotalPrice { get; set; }
        public string? NameCusNonAccount { get; set; }
        public string? PhoneCusNonAccount { get; set; }
        public string? AddressCusNonAccount { get; set; }
        public int? CustomerId { get; set; }
        public int? OrderStatusId { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public int? OrderMethodId { get; set; }
        public string MethodName { get; set; } = string.Empty;
        public int? StoreId { get; set; }
    }
    public class GetOrderDetailForCus
    {
        public int OrderDetailId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public int? CustomerId { get; set; }
    }
}
