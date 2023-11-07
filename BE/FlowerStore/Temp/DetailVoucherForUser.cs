namespace FlowerStore.Temp
{
    public class DetailVoucherForUser
    {
        public int DetailVoucherId { get; set; }
        public int? Quantity { get; set; }
        public int? CustomerId { get; set; }
        public int? VoucherId { get; set; }

        public string? VoucherName { get; set; }
        public int? VoucherPoint { get; set; }
        public double? VoucherValue { get; set;}
        public DateTime? DateExpire { get; set; }
    }
}
