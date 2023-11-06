using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Role
    {
        public Role()
        {
            Companies = new HashSet<Company>();
            Functions = new HashSet<Function>();
            Stores = new HashSet<Store>();
        }

        public int RoleId { get; set; }
        public string? RoleName { get; set; }

        public virtual ICollection<Company> Companies { get; set; }
        public virtual ICollection<Function> Functions { get; set; }
        public virtual ICollection<Store> Stores { get; set; }
    }
}
