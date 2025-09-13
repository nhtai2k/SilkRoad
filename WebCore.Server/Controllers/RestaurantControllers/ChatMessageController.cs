//using BusinessLogic.IHelpers.IQMSHelpers;
//using Common;
//using Common.Models;
//using DataAccess.QMSDTOs;
//using WebCore.Server.Controllers.BaseApiControllers;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Localization;

//namespace WebCore.Server.Controllers.RestaurantControllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class ChatMessageController : BaseApiController
//    {
//        private readonly IChatMessageHelper _helper;
//        private readonly ILogger<ChatMessageController> _logger;
//        private readonly IStringLocalizer<SharedResource> _localizer;
//        public ChatMessageController(
//            IChatMessageHelper helper,
//            ILogger<ChatMessageController> logger,
//            IStringLocalizer<SharedResource> localizer)
//        {
//            _helper = helper;
//            _logger = logger;
//            _localizer = localizer;
//        }

//        [HttpGet("getAll/{pageIndex}/{pageSize}")]
//        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
//        {
//            if (pageIndex < 1 || pageSize < 1)
//            {
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
//            }
//            Pagination<ChatMessageDTO> data = await _helper.GetAllAsync(pageIndex, pageSize);
//            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
//        }

//        [HttpGet("getAllDeleted/{pageIndex}/{pageSize}")]
//        public async Task<IActionResult> GetAllDeleted(int pageIndex, int pageSize)
//        {
//            if (pageIndex < 1 || pageSize < 1)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
//            var data = await _helper.GetAllDeletedAsync(pageIndex, pageSize);
//            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
//        }

//        [HttpGet("getById/{id}")]
//        public async Task<IActionResult> GetById(int id)
//        {
//            var data = await _helper.GetByIdAsync(id);
//            if (data == null)
//                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//            return Succeeded<ChatMessageDTO>(data, _localizer["dataFetchedSuccessfully"]);
//        }

//        [HttpPost("create")]
//        public async Task<IActionResult> Create([FromForm] ChatMessageDTO model)
//        {
//            if (model == null || !ModelState.IsValid)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//            var userName = User.Identity?.Name;
//            var result = await _helper.CreateAsync(model, userName);
//            if (!result)
//                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
//            return Succeeded(_localizer["createSuccess"]);
//        }

//        [HttpPut("update")]
//        public async Task<IActionResult> Update([FromForm] ChatMessageDTO model)
//        {
//            if (model == null || !ModelState.IsValid)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//            var userName = User.Identity?.Name;
//            var result = await _helper.UpdateAsync(model, userName);
//            if (!result)
//                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
//            return Succeeded(_localizer["updateSuccess"]);
//        }

//        [HttpPut("softDelete/{id}")]
//        public async Task<IActionResult> SoftDelete(int id)
//        {
//            var userName = User.Identity?.Name;
//            var result = await _helper.SoftDeleteAsync(id, userName);
//            if (!result)
//                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//            return Succeeded(_localizer["softDeleteSuccess"]);
//        }

//        [HttpPut("restore/{id}")]
//        public async Task<IActionResult> Restore(int id)
//        {
//            var userName = User.Identity?.Name;
//            var result = await _helper.RestoreAsync(id, userName);
//            if (!result)
//                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//            return Succeeded(_localizer["restoreSuccess"]);
//        }

//        [HttpDelete("delete/{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var result = await _helper.DeleteAsync(id);
//            if (!result)
//                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//            return Succeeded(_localizer["deleteSuccess"]);
//        }
//    }
//}
