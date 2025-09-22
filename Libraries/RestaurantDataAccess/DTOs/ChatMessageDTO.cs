namespace RestaurantDataAccess.DTOs
{
    public class ChatMessageDTO
    {
        public Guid Id { get; set; }
        public int RservationId { get; set; }
        public required string Sender { get; set; }
        public required string Content { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        public void Create(string? userName)
        {
            CreatedAt = DateTime.UtcNow;
            CreatedBy = userName;
            IsDeleted = false;
        }
        public void Update(string? userName)
        {
            UpdatedAt = DateTime.UtcNow;
            UpdatedBy = userName;
        }
        public void SoftDelete(string? userName)
        {
            IsDeleted = true;
            UpdatedAt = DateTime.UtcNow;
            UpdatedBy = userName;
        }
        public void Restore(string? userName)
        {
            IsDeleted = false;
            UpdatedAt = DateTime.UtcNow;
            UpdatedBy = userName;
        }
    }
}
