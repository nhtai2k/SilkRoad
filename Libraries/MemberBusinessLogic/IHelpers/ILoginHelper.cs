using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberBusinessLogic.IHelpers
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
