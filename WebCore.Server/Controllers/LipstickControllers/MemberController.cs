using Lipstick.BLL.ILipstickHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Share;
using System.Share.Models;
using System.Share.Services.ActionLoggingServices;
using System.Share.ViewModels.LipstickViewModels;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.LipstickControllers
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [Authorize]
    public class MemberController : BaseApiController
    {
        private readonly IMemberHelper _memberHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public MemberController(IMemberHelper memberHelper, IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _memberHelper = memberHelper;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll(string? phoneNumber, string? email, int pageIndex = 1, int pageSize = 10)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<MemberViewModel> data = _memberHelper.GetAll(phoneNumber, email, pageIndex, pageSize);
            //_actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}
