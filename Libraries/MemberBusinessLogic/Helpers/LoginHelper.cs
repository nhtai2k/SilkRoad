using Common;
using Common.Models;
using Common.Services.SMSServices;
using Common.ViewModels.LipstickClientViewModels;
using MemberBusinessLogic.IHelpers;
using MemberDataAccess.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using static System.Net.WebRequestMethods;

namespace MemberBusinessLogic.Helpers
{
    public class LoginHelper : ILoginHelper
    {
        private readonly UserManager<UserDTO> _userManager;
        private readonly SignInManager<UserDTO> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISMSService _sMSService;
        private const string OtpSessionKey = "UserOtp";
        private const string OtpTimeKey = "UserOtpTime";

        public LoginHelper( UserManager<UserDTO> userManager, SignInManager<UserDTO> signInManager,
            ISMSService sMSService,
            IHttpContextAccessor httpContextAccessor)
        { 
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _sMSService = sMSService;
        }
        public async Task<SignInResult> LoginAsync(LoginClientViewModel model)
        {
            return await _signInManager.PasswordSignInAsync(model.PhoneNumber, model.Password, false, false);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<DataObjectResult> SendSecurityCodeAsync(RecoverPasswordClientViewModel model)
        {
            DataObjectResult result = new DataObjectResult();
            string code = Global.GenerateRandomString(4, (int)EQRCodeTypes.Number);
            string message = string.Format("Your OTP code is {0}", code);
            result.OK = await _sMSService.SendSMSAsync(model.PhoneNumber, message);
            if (result.OK)
            {
                // Store the OTP in session
                var httpContext = _httpContextAccessor.HttpContext;
                if (httpContext != null)
                {
                    httpContext.Session.SetString(OtpSessionKey, code);
                    httpContext.Session.SetString(OtpTimeKey, DateTime.UtcNow.ToString());
                    result.Message = message;
                }
            }
            return result;
        }

        public async Task<DataObjectResult> VerifyCodeAsync(SecurityCodeClientViewModel model)
        {
            DataObjectResult result = new DataObjectResult();
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
                return result;

            // Retrieve OTP and timestamp from session
            var storedOtp = httpContext.Session.GetString(OtpSessionKey);
            var storedOtpTime = httpContext.Session.GetString(OtpTimeKey);

            if (string.IsNullOrEmpty(storedOtp) || string.IsNullOrEmpty(storedOtpTime))
                return result;

            // Check if OTP is expired (valid for 5 minutes)
            if (DateTime.TryParse(storedOtpTime, out var otpTime))
            {
                if (DateTime.UtcNow.Subtract(otpTime).TotalMinutes > 5)
                {
                    return result;
                }
            }
            else
            {
                return result;
            }
            // Validate the provided OTP
            if(storedOtp == model.Code)
            {
                var user = await _userManager.FindByNameAsync(model.PhoneNumber);
                if (user == null)
                    return result;
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                result.OK = true;
                result.Data = token;
                return result;
            }
            return result;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordClientViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.PhoneNumber);
            if (user == null)
                return false;
            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            return result.Succeeded;
        }
    


    }
}
