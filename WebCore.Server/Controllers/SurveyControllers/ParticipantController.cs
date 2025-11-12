using ClosedXML.Excel;
using Common;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Ollama;
using SurveyBusinessLogic.IHelpers;
using SurveyBusinessLogic.Models;
using SurveyDataAccess.DTOs;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ParticipantController : BaseApiController
    {
        private readonly IParticipantHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ParticipantController(IParticipantHelper helper, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }

        [HttpPost("filter")]
        public async Task<IActionResult> Filter([FromBody] ParticipantFilterModel filter)
        {
            if (filter == null)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.FilterAsync(filter);
            return Succeeded(result, _localizer["createSuccess"]);
        }

        [HttpPost("ExportExcel")]
        public async Task<IActionResult> ExportExcel([FromBody] ParticipantFilterModel filter)
        {
            if (filter == null)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.ExportExcel(filter);
            return Succeeded(result, _localizer["createSuccess"]);
        }

        /// <summary>
        /// Meaning to create a participant along with answers. Complete the survey
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] ParticipantDTO model)
        {
            if (model == null || !ModelState.IsValid || model.Answers == null || model.Answers.Count <= 0)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.CreateAsync(model);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        /// <summary>
        /// Meaning to initialize a participant before adding answers
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("InitParticipant")]
        [AllowAnonymous]
        public async Task<IActionResult> InitParticipant([FromBody] ParticipantDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var participant = await _helper.InitAsync(model);
            if (participant == null)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(participant, _localizer["createSuccess"]);
        }

        /// <summary>
        /// Meaning to add answers to an existing participant
        /// </summary>
        /// <param name="answers"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("addAnswers")]
        [AllowAnonymous]
        public async Task<IActionResult> InitParticipant([FromBody] List<AnswerDTO> answers)
        {
            if (answers == null || answers.Count <= 0)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool result = await _helper.AddAnswersAsync(answers);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("highlight/{id}")]
        public async Task<IActionResult> Highlight(Guid id)
        {
            var data = await _helper.HighlightAsync(id);
            if (!data)
                return Failed(EStatusCodes.InternalServerError, _localizer["operationFailed"]);
            return Succeeded(_localizer["operationSuccess"]);
        }

        [HttpPost("removeHighlight/{id}")]
        public async Task<IActionResult> RemoveHighlight(Guid id)
        {
            var data = await _helper.RemoveHighlightAsync(id);
            if (!data)
                return Failed(EStatusCodes.InternalServerError, _localizer["operationFailed"]);
            return Succeeded(_localizer["operationSuccess"]);
        }

        [HttpPost("reject/{id}")]
        public async Task<IActionResult> Reject(Guid id, [FromBody] string reason)
        {
            var data = await _helper.RejectAsync(id, reason);
            if (!data)
                return Failed(EStatusCodes.InternalServerError, _localizer["operationFailed"]);
            return Succeeded(_localizer["operationSuccess"]);
        }
    }
}
