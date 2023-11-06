using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class DetailVoucher
    {
        public int DetailVoucherId { get; set; }
        public int? Quantity { get; set; }
        public int? CustomerId { get; set; }
        public int? VoucherId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual Voucher? Voucher { get; set; }
    }
}
