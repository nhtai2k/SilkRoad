namespace Stock.DAL.DTOs
{
    public class TradeHistoryDTO
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public DateTime TradeDate { get; set; }
        public bool IsBuy { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double TotalAmount { get; set; }
        public double Fees { get; set; }
        public double? Tax { get; set; }
        public double? ProfitLoss { get; set; }
        public double? ProfitLossPercent { get; set; }
        public string? Note { get; set; }
    }
}
