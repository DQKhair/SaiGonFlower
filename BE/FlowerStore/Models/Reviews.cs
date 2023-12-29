using System.ComponentModel.DataAnnotations;

namespace FlowerStore.Models
{
    public class Reviews
    {
        [Key]
        public int ReviewId { get; set; }
        public int? Star { get; set; } = 5;
        public string? ContentReviews { get; set; }
        public DateTime ReviewsDate { get; set; } = DateTime.Now;
        public int? ProductId { get; set; }
        public int? CustomerId { get; set; }
        public int? OrderId { get; set; }

        public Product? Product { get; set; }
        public Customer? Customer { get; set; }
        public Order? Order { get; set; }
    }
}
