namespace FlowerStore.Models
{
    public partial class StaticProduct
    {
        public int StaticProductId { get; set; }
        public int? ProductId1 { get; set; }
        public int? ProductId2 { get; set; }

        public int? StatisticQuantity { get; set; }


        public virtual Product? Products { get; set; }
    }
}
