namespace PersonalFinanceDataAccess.DTOs
{
    public class IncomeDTO 
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int SourceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public IncomeDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
    }
}
