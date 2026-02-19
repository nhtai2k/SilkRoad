namespace Survey.DAL.DTOs
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
        public void SoftDelete(string? username = null)
        {
            IsDeleted = true;
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
        public void Restore(string? username = null)
        {
            IsDeleted = false;
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
    }
}
