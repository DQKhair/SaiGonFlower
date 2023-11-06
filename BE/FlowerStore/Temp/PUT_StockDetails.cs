namespace FlowerStore.Temp
{
    public class PUT_StockDetails
    {
        public int StockDetailId { get; set; }
        public int[]? Quantity { get; set; }
        public int? StoreId { get; set; }
        public int[]? MaterialId { get; set; }
    }
}
