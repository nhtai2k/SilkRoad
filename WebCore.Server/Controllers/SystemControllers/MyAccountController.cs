using BusinessLogic.IHelpers.ISystemHelpers;
using Common;
using Common.ViewModels.SystemViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SystemControllers
{
    [Route("api/system/[controller]")]
    [ApiController]
    public class MyAccountController : BaseApiController
    {
        private readonly IMyAccountHelper _myAccountHelper;
        public readonly IStringLocalizer<MyAccountController> _localizer;
        public readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        public MyAccountController(
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

        [HttpPost("RecoverPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> RecoverPassword([FromBody] RecoverPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _sharedLocalizer["invalidData"]);
            }
            bool result = await _myAccountHelper.RecoverPassword(model);
            if (result)
            {
                return Succeeded(_localizer["recoverPasswordSuccess"]);
            }
            else
            {
                return Failed(EStatusCodes.BadRequest, _localizer["recoverPasswordFailed"]);
            }
        }

        [HttpPost("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _sharedLocalizer["invalidData"]);
            }
            var result = await _myAccountHelper.ResetPasswordAsync(model);
            if (result)
            {
                return Succeeded(_localizer["resetPasswordSuccess"]);
            }
            else
            {
                return BadRequest(_localizer["resetPasswordFailed"]);
            }
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _sharedLocalizer["invalidData"]);
            }
            bool result = await _myAccountHelper.ChangePasswordAsync(model);
            if (result)
            {
                return Succeeded(_localizer["changePasswordSuccess"]);
            }
            else
            {
                return Failed(EStatusCodes.BadRequest, _localizer["changePasswordFailed"]);
            }
        }
    }
}
