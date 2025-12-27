using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using StockBusinessLogic.IHelpers;
using StockDataAccess.DTOs;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.StockControllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TradeHistoryController : BaseApiController
    {
        private readonly ITradeHistoryHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public TradeHistoryController(ITradeHistoryHelper helper, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }

        [HttpGet("GetAll/{pageIndex}/{pageSize}/{userId}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize, int userId)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllAsync(pageIndex, pageSize, userId);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] TradeHistoryDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.CreateAsync(model);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] TradeHistoryDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.UpdateAsync(model);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }
    }
}
