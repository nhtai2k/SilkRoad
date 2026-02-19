using Microsoft.AspNetCore.Identity;

namespace System.DAL.DTOs
{
    public class UserTokenDTO : IdentityUserToken<int>
    {
        public DateTime ExpirationTime { get; set; }
    }
}
