using Microsoft.AspNetCore.Identity;

namespace MemberDataAccess.DTOs
{
    public class UserDTO : IdentityUser<int>
    {
        public int GenderId { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public string? Address { get; set; }
        public string? FullName { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public IEnumerable<NotificationDTO> Notifications { get; set; }
        public UserDTO()
        {
            ProvinceId = -1;
            DistrictId = -1;
            GenderId = -1;
            CreatedOn = DateTime.Now;
            ModifiedOn = DateTime.Now;
            Notifications = new List<NotificationDTO>();
        }
    }
}
