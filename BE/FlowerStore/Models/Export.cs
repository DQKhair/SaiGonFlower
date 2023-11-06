using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Export
    {
        public int ExportId { get; set; }
        public DateTime? ExportDate { get; set; }
        public int? ExportFrom { get; set; }
        public int? ImportId { get; set; }

        public virtual Company? ExportFromNavigation { get; set; }
        public virtual Import? Import { get; set; }
    }
}
