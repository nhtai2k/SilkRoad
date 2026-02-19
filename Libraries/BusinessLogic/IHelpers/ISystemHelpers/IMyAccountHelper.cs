using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.DAL.DTOs;
using System.Share.Models;
using System.Share.ViewModels.SystemViewModels;

namespace System.BLL.IHelpers.ISystemHelpers
{
    public interface IMyAccountHelper
    {
        public Task<SignInResult> CheckPasswordSignInAsync(UserDTO user, string password);
        public Task<UserDTO?> FindByNameAsync(string userName);
        public Task<UserLoginInfoModel?> GetCurrentUserAsync(string userId);
        public Task<JwtViewModel> AuthenticateAsync(UserDTO user, bool rememberMe);
        public Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenAsync(ExternalAuthModel externalAuth);
        public Task<JwtViewModel?> ExternalLoginAsync(ExternalAuthModel externalAuth);
        public Task<string?> ReNewTokenAsync(string refreshToken, string token);
        public Task<string?> RefreshTokenAsync(string refreshToken);
        public Task<bool> ValidateRefreshTokenAsync(string refreshToken);
        public Task<bool> ChangePasswordAsync(ChangePasswordViewModel model);
        public Task<bool> RecoverPassword(RecoverPasswordViewModel model);
        public Task<bool> ResetPasswordAsync(ResetPasswordViewModel model);
        public Task<bool> RevokeRefreshTokenAsync(string refreshToken);
    }
}
