using Common;
using Common.Services.ActionLoggingServices;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using PersonalFinanceBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.PersonalFinanceControllers
{
    [Route("api/personalFinance/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetReportController : BaseApiController
    {
        private readonly IAssetReportHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public AssetReportController(IAssetReportHelper helper,
        IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }

        [HttpGet("GetColoumnChart/{userId}")]
        public async Task<IActionResult> GetColoumnChart(int userId)
        {
            var data = await _helper.GetColoumnChartAsync(userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetPieChart/{userId}")]
        public async Task<IActionResult> GetPieChart(int userId)
        {
            
            var data = await _helper.GetPieChartAsync(userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}