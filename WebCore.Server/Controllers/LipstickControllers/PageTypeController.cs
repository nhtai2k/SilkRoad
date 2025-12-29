using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.LipstickControllers
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [Authorize]

    public class PageTypeController : BaseApiController
    {
        private readonly IPageTypeHelper _pageTypeHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public PageTypeController(IPageTypeHelper pageTypeHelper, IStringLocalizer<SharedResource> localizer, IActionLoggingService actionLog)
        {
            _pageTypeHelper = pageTypeHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        [HttpGet]
        [Route("getAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<PageTypeViewModel> data = await _pageTypeHelper.GetAllAsync(pageIndex, pageSize);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getAllActive")]
        public IActionResult GetAllActive()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            IEnumerable<PageTypeViewModel> data = _pageTypeHelper.GetAllActive();
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getEPageType")]
        public async Task<IActionResult> GetEPageType()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            List<string> data = await _pageTypeHelper.GetEPageTypesAsync();
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet]
        [Route("getById/{Id}")]
        public IActionResult GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            PageTypeViewModel data = _pageTypeHelper.GetById(Id);
            if (data == null)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost]
        [Route("create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Create([FromBody] PageTypeViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _pageTypeHelper.Create(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        [HttpPut]
        [Route("update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Update([FromBody] PageTypeViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _pageTypeHelper.Update(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

    }
}
