using Microsoft.AspNetCore.Identity;

namespace DataAccess.DTOs
{
    public class UserRoleDTO : IdentityUserRole<int>
    {
        public UserDTO? User { get; set; }
    }
}
