using FlowerStore.Models;

namespace FlowerStore.Temp
{
    public class LikeByCustomer
    {
        public int LikeId { get; set; }
        public bool LikeStatus { get; set; }

        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public string? Image1 { get; set; }

        public string? ProductName { get; set; }

        public double? Price { get; set; }
    }
}
