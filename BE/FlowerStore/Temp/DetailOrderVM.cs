namespace FlowerStore.Temp
{
    public class DetailOrderVM
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public List<CartItem> listCartItem { get; set; } = new List<CartItem>();
    }

    public class CartItem
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
    }
}
