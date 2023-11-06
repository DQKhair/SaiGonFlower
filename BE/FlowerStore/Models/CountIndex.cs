using System.ComponentModel.DataAnnotations;

namespace FlowerStore.Models
{
    public class CountIndex
    {
        public int Id { get; set; }
        public int CountMonth { get; set; }
        public DateTime Date { get; set; }
    }
}
