using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess.DTOs;
using Common;
using Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.BOMControllers
{
    [ApiController]
    [Route("api/bom/[controller]")]
    [Authorize]
    public class DishGroupController : BaseApiController
    {
        private readonly IDishGroupHelper _helper;
        private readonly ILogger<DishGroupController> _logger;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public DishGroupController(
            IDishGroupHelper helper,
            ILogger<DishGroupController> logger,
            IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _logger = logger;
            _localizer = localizer;
        }

        [HttpGet("getAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<DishGroupDTO> data = await _helper.GetAllAsync(pageIndex, pageSize);
            return Succeeded<Pagination<DishGroupDTO>>(data, _localizer["dataFetchedSuccessfully"]);
        }

        // [HttpGet("getAllActive/{pageIndex}/{pageSize}")]
        // public async Task<IActionResult> GetAllActive(int pageIndex, int pageSize)
        // {
        //     if (pageIndex < 1 || pageSize < 1)
        //         return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
        //     var data = await _helper.GetAllActiveAsync(pageIndex, pageSize);
        //     return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        // }

        [HttpGet("GetOptionList")]
        public async Task<IActionResult> GetOptionList()
        {
            var data = await _helper.GetOptionListAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getAllDeleted/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAllDeleted(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllDeletedAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded<DishGroupDTO>(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("getEargerById/{id}")]
        public async Task<IActionResult> GetEargerById(int id)
        {
            var data = await _helper.GetEagerByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded<DishGroupDTO>(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] DishGroupDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool codeExists = await _helper.IsCodeExistsAsync(model.Code);
            if (codeExists)
                return Failed(Common.EStatusCodes.Conflict, _localizer["codeAlreadyExists"]);
            var userName = User.Identity?.Name;
            var result = await _helper.CreateAsync(model, userName);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromForm] DishGroupDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.UpdateAsync(model, userName);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }

        [HttpPut("softDelete/{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _helper.SoftDeleteAsync(id, userName);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["softDeleteSuccess"]);
        }

        [HttpPut("restore/{id}")]
        public async Task<IActionResult> Restore(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _helper.RestoreAsync(id, userName);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["restoreSuccess"]);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }
    }
}
