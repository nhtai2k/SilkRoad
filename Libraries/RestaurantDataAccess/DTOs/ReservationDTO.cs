namespace Restaurant.DAL.DTOs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public int? TableId { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public int NumberOfGuests { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public string? Note { get; set; }
        public string? AdminNote { get; set; }
        public string? CancellationReason { get; set; }
        public bool HasCheckedIn { get; set; } = false;
        public bool HasCheckedOut { get; set; } = false;
        public bool IsCancelled { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }

        public ReservationDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
        public virtual void Create(string? username = null)
        {
            CreatedBy = username;
            ModifiedBy = username;
        }
        public virtual void Update(string? username = null)
        {
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
    }
}
