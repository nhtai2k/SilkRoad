using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using PersonalFinanceBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.PersonalFinanceControllers
{
    [Route("api/pf/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportController : BaseApiController
    {
        private readonly IReportHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ReportController(IReportHelper helper,
        IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }

        [HttpGet("GetColoumnChartByMonth/{userId}/{month}")]
        public async Task<IActionResult> GetColoumnChartByMonth(int userId, string month)
        {
            var data = await _helper.GetColoumnChartByMonth(month, userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

    }
}