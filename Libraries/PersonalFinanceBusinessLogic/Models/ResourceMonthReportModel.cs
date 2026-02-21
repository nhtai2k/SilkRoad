namespace PersonalFinance.BLL.Models
{
    public class ResourceMonthReportModel
    {
        public required string Month { get; set; }
        public decimal Inflow { get; set; }
        public decimal Outflow { get; set; }
        public decimal NetIncome { get; set; }
    }
}