using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using PersonalFinance.BLL.IHelpers;
using PersonalFinance.DAL.DTOs;
using System.Share;
using System.Share.Models;
using System.Share.Services.ActionLoggingServices;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.PersonalFinanceControllers
{
    [Route("api/personalFinance/[controller]")]
    [ApiController]
    [Authorize]
    public class ResourceReportController : BaseApiController
    {
        private readonly IResourceReportHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ResourceReportController(IResourceReportHelper helper,
        IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }
        [HttpGet("GetClusteredColumnChart/{userId}/{year}")]
        public async Task<IActionResult> GetClusteredColumnChart(int userId, int year)
        {

            var data = await _helper.GetClusteredColumnChartAsync(year, userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

    }
}