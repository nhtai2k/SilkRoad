namespace PersonalFinanceDataAccess.DTOs
{
    public class ResourceDTO 
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int TypeId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public bool Inflow { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public ResourceTypeDTO? ResourceType { get; set; }
        public ResourceDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
    }
}
