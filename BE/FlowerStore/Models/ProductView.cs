namespace FlowerStore.Models
{
    public partial class ProductView
    {
        public int ProductViewId { get; set; }
        public int? ProductId { get; set; }
        public int? CustomerId { get; set; }
        public int? ViewCount { get; set; }
        public int? PurchaseCount { get; set; }


        public virtual Product? Products { get; set; }

        public virtual Customer? Customers { get; set; }
    }
}