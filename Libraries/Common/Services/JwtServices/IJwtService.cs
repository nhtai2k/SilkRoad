using System.Security.Claims;
using System.Share.ViewModels.SystemViewModels;

namespace System.Share.Services.JwtServices
{
    public interface IJwtService
    {
        string GenerateAccessToken(UserViewModel model);
        string GenerateRefreshToken();
        string RenewToken(string expiredToken);
        string CreateToken(List<Claim> claims);
        List<Claim> GetClaimsFromToken(string token);
        ClaimsPrincipal GetPrincipalFromToken(string token);
        int GetUserIdFromToken(string token);
        string GetUserNameFromToken(string token);
    }
}
