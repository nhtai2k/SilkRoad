using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
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
        private readonly IParticipantHelper _participantHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ParticipantController(IParticipantHelper participant, IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _participantHelper = participant;
            _actionLog = actionLog;
            _localizer = localizer;
        }

        [HttpGet("filter")]
        public  Task<IActionResult> Filter(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }

        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] ParticipantDTO model)
        {
            await _participantHelper.CreateAsync(model);
            return Ok();
        }

        [HttpGet("GetById/{id}")]
        public Task<IActionResult> GetById(Guid id)
        {
          throw new NotImplementedException();
        }

        [HttpGet("ExportExcel")]
        public Task<IActionResult> ExportExcel(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }
    }
}
