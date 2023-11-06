using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class ImportDetail
    {
        public int ImportDetailId { get; set; }
        public int? Quantity { get; set; }
        public int? ImportId { get; set; }
        public int? MaterialId { get; set; }

        public virtual Import? Import { get; set; }
        public virtual Material? Material { get; set; }
    }
}
