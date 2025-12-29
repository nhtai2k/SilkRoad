namespace BOMDataAccess.DTOs
{
    public class BaseDTO
    {
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public BaseDTO()
        {
            CreatedOn = DateTime.Now;
            ModifiedOn = DateTime.Now;
        }
        public virtual void Create(string? username = null)
        {
            CreatedBy = username;
            ModifiedBy = username;
        }
        public virtual void Update(string? username = null)
        {
            ModifiedBy = username;
            ModifiedOn = DateTime.Now;
        }
        public void SoftDelete(string? username = null)
        {
            IsDeleted = true;
            ModifiedBy = username;
            ModifiedOn = DateTime.Now;
        }
        public void Restore(string? username = null)
        {
            IsDeleted = false;
            ModifiedBy = username;
            ModifiedOn = DateTime.Now;
        }
    }
}
