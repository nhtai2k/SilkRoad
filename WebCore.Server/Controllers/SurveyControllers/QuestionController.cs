using Common;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess.DTOs;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionController : BaseApiController
    {
        private readonly IQuestionHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QuestionController(IQuestionHelper helper,
        IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }

        [HttpGet("getBySurveyFormId/{surveyFormId}")]
        public async Task<IActionResult> GetBySurveyFormId(int surveyFormId)
        {
            if (surveyFormId < 1)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            var data = await _helper.GetBySurveyFormIdAsync(surveyFormId);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getByQuestionGroupId/{questionGroupId}")]
        public async Task<IActionResult> GetByQuestionGroupId(Guid questionGroupId)
        {
            if (questionGroupId == Guid.Empty)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            var data = await _helper.GetByQuestionGroupIdAsync(questionGroupId);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetEagerLoadingByIdAsync/{id}")]
        public async Task<IActionResult> GetEagerLoadingByIdAsync(Guid id)
        {
            var data = await _helper.GetEagerLoadingByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] QuestionDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.CreateAsync(model);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] QuestionDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.UpdateAsync(model);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }
    }
}
