using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using PersonalFinance.BLL.IHelpers;
using System.Share;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.PersonalFinanceControllers
{
    [Route("api/personalFinance/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpenseReportController : BaseApiController
    {
        private readonly IExpenseReportHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ExpenseReportController(IExpenseReportHelper helper,
        IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }

        [HttpGet("GetColoumnChartByMonth/{userId}/{month}")]
        public async Task<IActionResult> GetColoumnChartByMonthAsync(int userId, DateTime month)
        {
            var data = await _helper.GetColoumnChartByMonth(month, userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetColoumnChartByYear/{userId}/{year}")]
        public async Task<IActionResult> GetColoumnChartByMonthAsync(int userId, int year)
        {

            var data = await _helper.GetColoumnChartByMonth(year, userId);
            if (data == null || data.Count == 0)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["noDataFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
    }
}