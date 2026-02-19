using Microsoft.AspNetCore.Identity;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Member.BLL.IHelpers
{
    public interface ILoginHelper
    {
        public Task<SignInResult> LoginAsync(LoginClientViewModel model);
        public Task LogoutAsync();
        public Task<DataObjectResult> SendSecurityCodeAsync(RecoverPasswordClientViewModel model);
        public Task<DataObjectResult> VerifyCodeAsync(SecurityCodeClientViewModel model);
        public Task<bool> ResetPasswordAsync(ResetPasswordClientViewModel model);
    }
}
