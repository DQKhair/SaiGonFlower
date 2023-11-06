using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class News
    {
        public int NewsId { get; set; }
        public string? Content { get; set; }
        public DateTime? NewsDate { get; set; }
        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
    }
}
