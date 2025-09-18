using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using SurveyBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionTypeController : BaseApiController
    {
        private readonly IQuestionTypeHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QuestionTypeController(IQuestionTypeHelper helper, IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _helper.GetAllAsync();
            //string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
            [HttpGet("GetOptionList")]
        public async Task<IActionResult> GetOptionList()
        {
            var data = await _helper.GetOptionListAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}
