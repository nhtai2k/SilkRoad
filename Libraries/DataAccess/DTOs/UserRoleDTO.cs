using Microsoft.AspNetCore.Identity;

namespace System.DAL.DTOs
{
    public class UserRoleDTO : IdentityUserRole<int>
    {
        public UserDTO? User { get; set; }
    }
}
