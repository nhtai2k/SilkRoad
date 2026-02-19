using Lipstick.BLL.ILipstickHelpers;
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
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentHelper _paymentHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public PaymentController(IPaymentHelper paymentHelper, IStringLocalizer<SharedResource> localizer, IActionLoggingService actionLog)
        {
            _paymentHelper = paymentHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll(int paymentTypeId = -1, int statusId = -1, int pageIndex = 1, int pageSize = 10)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                //await _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            //await _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            Pagination<PaymentViewModel> data = await _paymentHelper.GetAllAsync(paymentTypeId, statusId, pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            PaymentViewModel? data = await _paymentHelper.GetByIdAsync(id);
            if (data == null)
            {
                //await _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            //await _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}
