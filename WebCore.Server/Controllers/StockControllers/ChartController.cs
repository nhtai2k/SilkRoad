using Common;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using StockBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.StockControllers
{
    [Route("api/stock/[controller]")]
    [ApiController]
    [Authorize]
    public class ChartController : BaseApiController
    {
        private readonly IStockPriceHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ChartController(IStockPriceHelper helper,
        IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }

        [HttpGet("GetAll/{symbol}")]
        public async Task<IActionResult> GetAll(string symbol)
        {
            var data = await _helper.GetAllAsync(symbol);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getNewData/{symbol}")]
        public async Task<IActionResult> GetNewData(string symbol)
        {
            bool status = await _helper.FetchData(symbol);
            if (!status)
                return Failed(EStatusCodes.InternalServerError, _localizer["loadNewDataFail"]);
            return Succeeded(_localizer["fetchDataSuccess"]);
        }
    }
}
