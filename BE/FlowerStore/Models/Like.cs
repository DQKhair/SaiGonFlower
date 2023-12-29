namespace FlowerStore.Models
{
    public partial class Like
    {
        public int LikeId { get; set; }
        public bool LikeStatus { get; set; }

        public int ProductId { get; set; }
        public int CustomerId { get; set; }

        public virtual Product? Product{ get; set; }

        public virtual Customer? Customer { get; set; }
    }
}
