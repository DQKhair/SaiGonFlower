using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class News
    {
        public int NewsId { get; set; }
        public string? Content { get; set; }
        public DateTime? NewsDate { get; set; }

        public string? FormatNewsDate => NewsDate?.ToString("yyyy/MM/dd HH:mm:ss");

        public DateTime? ExpireDate { get; set; }

        public string? FormatExpireDate => ExpireDate?.ToString("yyyy/MM/dd HH:mm:ss");

        public string? Title { get; set; }

        public bool? Status { get; set; }

        public int? CompanyId { get; set; }


        public virtual Company? Company { get; set; }
    }
}
