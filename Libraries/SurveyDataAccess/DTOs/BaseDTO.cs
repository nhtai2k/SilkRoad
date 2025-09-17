namespace SurveyDataAccess.DTOs
{
    public abstract class BaseDTO
    {
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public BaseDTO()
        {
            IsDeleted = false;
            IsActive = true;
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
    }
}
