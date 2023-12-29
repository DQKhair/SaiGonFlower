namespace FlowerStore.Temp
{
    public class RevenueByDay
    {
        public DateTime Date { get; set; }
        public string? FormattedDate => Date.ToString("dd/MM/yyyy");
        public int OrderCount { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}
