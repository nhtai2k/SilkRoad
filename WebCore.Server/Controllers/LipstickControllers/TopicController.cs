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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TopicController : BaseApiController
    {
        private readonly ITopicHelper _topicHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public TopicController(ITopicHelper topicHelper, IStringLocalizer<SharedResource> localizer, IActionloggingService actionLog)
        {
            _topicHelper = topicHelper;
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
            Pagination<TopicViewModel> data = await _topicHelper.GetAllAsync(pageIndex, pageSize);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet]
        [Route("getAllActive")]
        public IActionResult GetAllActive()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            IEnumerable<TopicViewModel> data = _topicHelper.GetAllActive();
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getById/{Id}")]
        public IActionResult GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            TopicViewModel data = _topicHelper.GetById(Id);
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
        public IActionResult Create([FromForm] TopicViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _topicHelper.Create(model);
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
        public IActionResult Update([FromForm] TopicViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _topicHelper.Update(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
        [HttpDelete]
        [Route("delete")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Delete(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var result = _topicHelper.Delete(Id);
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
