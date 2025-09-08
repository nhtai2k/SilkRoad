using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StockBusinessLogic.IHelpers;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.StockControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : BaseApiController
    {
        private readonly IStockPriceHelper _stockPriceHelper;
        public ChartController(IStockPriceHelper stockHistoryHelper)
        {
            _stockPriceHelper = stockHistoryHelper;
        }

        [HttpGet("GetAll/{symbol}")]
        public async Task<IActionResult> GetAll(string symbol)
        {
            var data = await _stockPriceHelper.GetAllAsync(symbol);
            return Ok(data);
        }
        [HttpGet("getNewData/{symbol}")]
        public async Task<IActionResult> GetNewData(string symbol)
        {
            bool status = await _stockPriceHelper.FetchData(symbol);
            if (!status)
                return Failed(Common.EStatusCodes.InternalServerError, "createFailed");
            return Succeeded("fetch Data");
        }
    }
}
