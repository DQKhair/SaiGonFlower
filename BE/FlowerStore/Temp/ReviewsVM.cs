namespace FlowerStore.Temp
{
    public class ReviewsVM
    {
        public int OrderId { get; set; } = 0;
        public int CustomerId { get; set; } = 0;
        public int[] DataProductId { get; set; } = new int[0];
        public int[] DataStar { get; set; } = new int[0];
        public string[] DataContent { get; set; } = new string[0];
    }
}
