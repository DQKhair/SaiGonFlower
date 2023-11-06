using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class IeStatus
    {
        public IeStatus()
        {
            Imports = new HashSet<Import>();
        }

        public int IestatusId { get; set; }
        public string? IestatusName { get; set; }

        public virtual ICollection<Import> Imports { get; set; }
    }
}
