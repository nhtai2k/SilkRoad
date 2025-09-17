using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using SurveyBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionGroupController : BaseApiController
    {
        private readonly IQuestionGroupLibraryHelper _questionGroupHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QuestionGroupController(IQuestionGroupLibraryHelper questionGroupHelper, IActionloggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _questionGroupHelper = questionGroupHelper;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetAll")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetAll(int pageIndex = 1, int pageSize = 10, bool getActive = false)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<QuestionGroupViewModel> data = await _questionGroupHelper.GetAllAsync(pageIndex, pageSize, getActive);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("GetAllActive")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetAllActive()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<QuestionGroupViewModel> data = await _questionGroupHelper.GetAllByActiveAsync(true);
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetById/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetById(int id)
        {
            string tokin = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var data = await _questionGroupHelper.GetByIdAsync(id);
            if (data == null)
            {
                _actionLog.CreateAsync(tokin, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(tokin, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetEagerById/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetEagerById(int id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var data = _questionGroupHelper.GetEagerQuestionGroupByID(id);
            if (data == null)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetEagerAllElements")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.View, EModule.Survey)]
        public IActionResult GetEagerAllElements(bool getActive = true)
        {
            IEnumerable<QuestionGroupViewModel> data = _questionGroupHelper.GetEagerAllElements(getActive);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("Create")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.Create, EModule.Survey)]
        public async Task<IActionResult> Create([FromBody] QuestionGroupViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            bool result = await _questionGroupHelper.CreateAsync(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        [HttpPut("Update")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.Update, EModule.Survey)]
        public async Task<IActionResult> Update([FromBody] QuestionGroupViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            bool result = await _questionGroupHelper.UpdateAsync(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

        [HttpPatch("SoftDelete/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionGroup, ERoleClaim.SoftDelete, EModule.Survey)]
        public async Task<IActionResult> Delete(int id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            bool result = await _questionGroupHelper.SoftDeleteAsync(id);
            if (!result)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Delete, EUserActionStatus.Failed, id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Delete, EUserActionStatus.Successful, id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
    }
}
