using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.BLL.IHelpers.ISystemHelpers;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.SystemViewModels;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SystemControllers
{
    [Route("api/system/[controller]")]
    public class AuthController : BaseApiController
    {
        //private readonly SignInManager<UserDTO> _signInManager;
        private readonly IMyAccountHelper _myAccountHelper;
        //private readonly IActionLoggingService _actionLog;
        public readonly IStringLocalizer<MyAccountController> _localizer;
        public readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        public AuthController(
            //SignInManager<UserDTO> signInManager,
            IStringLocalizer<MyAccountController> localizer,
            IStringLocalizer<SharedResource> sharedLocalizer,
            //IActionLoggingService actionLog,
            IMyAccountHelper myAccountHelper)
        {
            //_signInManager = signInManager;
            _myAccountHelper = myAccountHelper;
            _localizer = localizer;
            _sharedLocalizer = sharedLocalizer;
            //_actionLog = actionLog;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _sharedLocalizer["invalidData"]);
            }
            var user = await _myAccountHelper.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["usernameOrPasswordIncorrect"]);
            }
            else if (!user.IsActive)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["deactiveUser"]);
            }

            var result = await _myAccountHelper.CheckPasswordSignInAsync(user, model.Password);
            if (result.Succeeded)
            {
                JwtViewModel jwt = await _myAccountHelper.AuthenticateAsync(user, model.RememberMe);
                // Set refresh token in HttpOnly cookie
                Response.Cookies.Append("refresh_token", jwt.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Path = "api/Auth/*"
                });

                return Succeeded(jwt.Token, _localizer["loginSuccess"]);
            }
            else if (result.IsLockedOut)
            {
                //await _actionLog.CreateAsync(userAction);
                return Failed(EStatusCodes.Locked, _localizer["accountLocked"]);
            }
            else
            {
                //await _actionLog.CreateAsync(userAction);
                return Failed(EStatusCodes.BadRequest, _localizer["usernameOrPasswordIncorrect"]);
            }
        }

        [HttpPost("ExternalLogin")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthModel externalAuth)
        {
            JwtViewModel? jwt = await _myAccountHelper.ExternalLoginAsync(externalAuth);
            if (jwt == null)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["externalLoginFailed"]);
            }
            // Set refresh token in HttpOnly cookie
            Response.Cookies.Append("refresh_token", jwt.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Path = "api/Auth/*"
            });

            return Succeeded(jwt.Token, _localizer["loginSuccess"]);
        }

        [HttpGet("ValidateRefreshToken")]
        public async Task<IActionResult> ValidateRefreshToken()
        {
            string? refreshToken = Request.Cookies["refresh_token"];
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Failed(EStatusCodes.BadRequest, _localizer["refreshTokenInvalid"]);
            }
            bool result = await _myAccountHelper.ValidateRefreshTokenAsync(refreshToken);
            if (result)
            {
                return Succeeded(_localizer["refreshTokenValid"]);
            }
            else
            {
                return Failed(EStatusCodes.BadRequest, _localizer["refreshTokenInvalid"]);
            }
        }

        //[HttpGet("ReNewToken")]
        //public async Task<IActionResult> ReNewToken([FromHeader] string token)
        //{
        //    try
        //    {
        //        string? refreshToken = Request.Cookies["refresh_token"];
        //        if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(token))
        //        {
        //            return Failed(EStatusCodes.BadRequest, _localizer["renewTokenFailed"]);
        //        }

        //        string? newToken = await _myAccountHelper.ReNewTokenAsync(refreshToken, token);
        //        if (!string.IsNullOrEmpty(newToken))
        //        {
        //            return Succeeded(newToken, _localizer["renewTokenSuccess"]);
        //        }
        //        else
        //        {
        //            return Failed(EStatusCodes.BadRequest, _localizer["renewTokenFailed"]);
        //        }
        //    }
        //    catch
        //    {
        //        return Failed(EStatusCodes.Unauthorized, _localizer["renewTokenFailed"]);
        //    }

        //}

        [HttpGet("RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            string? refreshToken = Request.Cookies["refresh_token"];
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Failed(EStatusCodes.BadRequest, _localizer["refreshTokenInvalid"]);
            }
            string? newToken = await _myAccountHelper.RefreshTokenAsync(refreshToken);
            if (!string.IsNullOrEmpty(newToken))
            {
                return Succeeded(newToken, _localizer["tokenRefreshedSuccessfully"]);
            }
            else
            {
                return Failed(EStatusCodes.BadRequest, _localizer["refreshTokenInvalid"]);
            }
        }

        [HttpGet("GetCurrentUser")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = User;
            //get userid
            string? userId = user.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                var userData = await _myAccountHelper.GetCurrentUserAsync(userId);
                if (userData != null)
                {
                    return Succeeded(userData, _localizer["currentUserFetchedSuccessfully"]);
                }
            }
            return Failed(EStatusCodes.BadRequest, _localizer["refreshTokenInvalid"]);
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            string? refreshToken = Request.Cookies["refresh_token"];
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                await _myAccountHelper.RevokeRefreshTokenAsync(refreshToken);
                Response.Cookies.Delete("refresh_token", new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Path = "api/Auth/*"

                });
            }
            return Succeeded(_localizer["logoutSuccess"]);
        }
    }
}
