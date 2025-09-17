using Common.Models;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SystemControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActionLoggingController : BaseApiController
    {
        private readonly IActionloggingService _actionloggingService;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ActionLoggingController(IActionloggingService actionloggingService,
            IStringLocalizer<SharedResource> localizer)
        {
            _actionloggingService = actionloggingService;
            _localizer = localizer;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize,
            string? controllerName, string? actionName, DateTime? startDate, DateTime? endDate)
        {
            if (pageIndex < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            Pagination<UserActionModel> data = await _actionloggingService.GetAllAsync(controllerName, actionName, startDate, endDate, pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            UserActionModel data = await _actionloggingService.GetAsync(id);
            if (data == null)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataNotFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);

        }
    }
}
