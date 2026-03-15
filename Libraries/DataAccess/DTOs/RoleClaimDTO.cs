using Microsoft.AspNetCore.Identity;

namespace System.DAL.DTOs
{
    public class RoleClaimDTO : IdentityRoleClaim<int>
    {
        public virtual RoleDTO? Role { get; set; }
    }
}
