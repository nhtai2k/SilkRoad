using Common.Models;
using Common.ViewModels.SystemViewModels;
using DataAccess.DTOs;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;

namespace BusinessLogic.IHelpers.ISystemHelpers
{
    public interface IMyAccountHelper
    {
        public Task<SignInResult> CheckPasswordSignInAsync(UserDTO user, string password);
        public Task<UserDTO?> FindByNameAsync(string userName);
        public Task<UserLoginInfoModel?> GetCurrentUserAsync(string userId);
        public Task<JwtViewModel> AuthenticateAsync(UserDTO user, bool rememberMe);
        //public Task<JwtViewModel> LoginAsync(LoginViewModel model);
        public Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenAsync(ExternalAuthModel externalAuth);
        public Task<string?> ExternalLoginAsync(ExternalAuthModel externalAuth);
        public Task<string?> ReNewTokenAsync(string refreshToken, string token);
        public Task<string?> RefreshTokenAsync(string refreshToken);
        public Task<bool> ValidateRefreshTokenAsync(string refreshToken);
        public Task<bool> ChangePasswordAsync(ChangePasswordViewModel model);
        public Task<bool> RecoverPassword(RecoverPasswordViewModel model);
        public Task<bool> ResetPasswordAsync(ResetPasswordViewModel model);
        public Task<bool> RevokeRefreshTokenAsync(string refreshToken);
    }
}
