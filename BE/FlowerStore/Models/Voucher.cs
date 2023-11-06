using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Voucher
    {
        public Voucher()
        {
            DetailVouchers = new HashSet<DetailVoucher>();
        }

        public int VoucherId { get; set; }
        public string? VoucherName { get; set; }
        public int? VoucherPoint { get; set; }
        public double? VoucherValue { get; set; }
        public int? VoucherQuantity { get; set; }
        public DateTime? DateExpire { get; set; }
        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
        public virtual ICollection<DetailVoucher> DetailVouchers { get; set; }
    }
}
