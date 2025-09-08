using Common;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.SurveyViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using SurveyBusinessLogic.IHelpers;
using WebCore.Server;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionTypeController : BaseApiController
    {
        private readonly IQuestionTypeHelper _questionTypeHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QuestionTypeController(IQuestionTypeHelper questionTypeHelper, IActionloggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _questionTypeHelper = questionTypeHelper;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetAll")]
        //[AuthorizeEnumPolicy(ERoleClaimGroup.QuestionType, ERoleClaim.View, EModule.Survey)]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<QuestionTypeViewModel> data = await _questionTypeHelper.GetAllAsync();
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);

            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}
