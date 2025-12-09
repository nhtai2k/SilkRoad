namespace PersonalFinanceDataAccess.DTOs
{
    public class ExpenseDTO
    {
        public Guid Id { get; set; }
        public int PaymentMethodId { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public ExpenseDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
    }
}
