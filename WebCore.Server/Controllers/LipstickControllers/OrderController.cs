using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.LipstickControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseApiController
    {
        private readonly IOrderHelper _orderHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public OrderController(IOrderHelper orderHelper, IStringLocalizer<SharedResource> localizer, IActionloggingService actionLog)
        {
            _orderHelper = orderHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize, int statusId, string? phoneNumber)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<OrderViewModel> data = await _orderHelper.GetAllAsync(pageIndex, pageSize, statusId, phoneNumber);
            await _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getById/{Id}")]
        public async Task<IActionResult> GetById(Guid Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            OrderViewModel? data = _orderHelper.GetById(Id);
            if (data == null)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            await _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost]
        [Route("create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> Create([FromBody] OrderViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _orderHelper.CreateAsync(model);
            if (!result)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            await _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        [HttpPut]
        [Route("update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> Update([FromBody] OrderViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _orderHelper.UpdateAsync(model);
            if (!result)
            {
                await _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            await _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
    }
}
