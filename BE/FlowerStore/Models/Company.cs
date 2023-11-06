using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Company
    {
        public Company()
        {
            Exports = new HashSet<Export>();
            News = new HashSet<News>();
            Vouchers = new HashSet<Voucher>();
        }

        public int CompanyId { get; set; }
        public string? CompanyUserName { get; set; }
        public string? PassWordCompany { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Export> Exports { get; set; }
        public virtual ICollection<News> News { get; set; }
        public virtual ICollection<Voucher> Vouchers { get; set; }
    }
}
