namespace FlowerStore.Temp
{
    public class Import_Temp
    {
        public int ImportId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string? FormatCreatedDate => CreatedDate?.ToString("dd/MM/yyyy HH:mm:ss");
        public DateTime? ImportDate { get; set; }
        public int? TotalQuantity { get; set; }
        public int? StoreId { get; set; }
        public int? IestatusId { get; set; }

        public string? IestatusName { get; set; }
    }
}
