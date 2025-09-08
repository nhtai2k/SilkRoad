using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.Services.JwtServices;
using Common.ViewModels.SurveyViewModels;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using SurveyBusinessLogic.IHelpers;
using WebCore.Server;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : BaseApiController
    {
        private readonly IQuestionHelper _questionHelper;
        private readonly IJwtService _jwtService;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QuestionController(IQuestionHelper questionHelper, IJwtService jwtService, IActionloggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _questionHelper = questionHelper;
            _jwtService = jwtService;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetAll")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetAll()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<QuestionViewModel> data = await _questionHelper.GetAllAsync();
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);

            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetAllByQuestionGroupId/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetAll(int id, int pageIndex = 1, int pageSize = 10)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<QuestionViewModel> data = await _questionHelper.GetAllAsync(id, pageIndex, pageSize);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);

            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetById/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetById(int id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var data = await _questionHelper.GetByIdAsync(id);
            if (data == null)
            {
                _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);

            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("Create")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.Create, EModule.Survey)]
        public async Task<IActionResult> Create([FromBody] QuestionViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _questionHelper.CreateAsync(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        [HttpPut("Update")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.Update, EModule.Survey)]
        public async Task<IActionResult> Update([FromBody] QuestionViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _questionHelper.UpdateAsync(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

        [HttpPatch("SoftDelete/{id}")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.Question, ERoleClaim.SoftDelete, EModule.Survey)]
        public async Task<IActionResult> Delete(int id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            bool result = await _questionHelper.SoftDeleteAsync(id);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Successful, id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
    }
}
