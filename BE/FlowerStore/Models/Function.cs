using System;
using System.Collections.Generic;

namespace FlowerStore.Models
{
    public partial class Function
    {
        public int FunctionId { get; set; }
        public string? FunctionName { get; set; }
        public string? Route { get; set; }
        public int? RoleId { get; set; }
        public string? Icon { get; set; }

        public virtual Role? Role { get; set; }
    }
}
