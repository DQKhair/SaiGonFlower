using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Import
    {
        public Import()
        {
            Exports = new HashSet<Export>();
            ImportDetails = new HashSet<ImportDetail>();
        }

        public int ImportId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string? FormatCreatedDate => CreatedDate?.ToString("dd/MM/yyyy HH:mm:ss");
        public DateTime? ImportDate { get; set; }

        public DateTime? ExportDate { get; set; }

        public int? TotalQuantity { get; set; }
        public int? StoreId { get; set; }
        public int? IestatusId { get; set; }

        public virtual IeStatus? Iestatus { get; set; }
        public virtual Store? Store { get; set; }
        public virtual ICollection<Export> Exports { get; set; }
        public virtual ICollection<ImportDetail> ImportDetails { get; set; }
    }
}
