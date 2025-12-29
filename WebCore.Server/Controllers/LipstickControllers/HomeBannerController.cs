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
    public class HomeBannerController : BaseApiController
    {
        private readonly IHomeBannerHelper _homeBannerHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public HomeBannerController(IHomeBannerHelper homeBannerHelper, IStringLocalizer<SharedResource> localizer, IActionLoggingService actionLog)
        {
            _homeBannerHelper = homeBannerHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        [HttpGet]
        [Route("getAll/{pageIndex}/{pageSize}/{bannerTypeId}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize, int bannerTypeId)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<HomeBannerViewModel> data = await _homeBannerHelper.GetAllAsync(pageIndex, pageSize, bannerTypeId);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getByBannerTypeId/{bannerTypeId}")]
        public IActionResult GetByBannerTypeId(int bannerTypeId = -1)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<HomeBannerViewModel> data = _homeBannerHelper.GetByBannerTypeId(bannerTypeId);
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getAllActive")]
        public IActionResult GetAllActive()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<HomeBannerViewModel> data = _homeBannerHelper.GetAllActive();
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getById/{Id}")]
        public IActionResult GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var data = _homeBannerHelper.GetById(Id);
            if (data == null)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpPost]
        [Route("create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Create([FromForm] HomeBannerViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid || model.ImageFile == null)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _homeBannerHelper.Create(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }
        [HttpPut]
        [Route("update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Update([FromForm] HomeBannerViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _homeBannerHelper.Update(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }

            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
        [HttpDelete]
        [Route("delete/{Id}")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Delete(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var result = _homeBannerHelper.Delete(Id);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, Id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Successful, Id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
    }
}
