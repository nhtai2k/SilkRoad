using BusinessLogic.IBOMHelpers;
using DataAccess.BOMDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.BOMControllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UnitController : BaseApiController
    {
        private readonly IUnitHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public UnitController(IUnitHelper helper, IStringLocalizer<SharedResource> localizer) { _helper = helper; _localizer = localizer; }

        [HttpGet("GetAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetOptionList")]
        public async Task<IActionResult> GetOptionList()
        {
            var data = await _helper.GetOptionListAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("GetTreeOptionList")]
        public async Task<IActionResult> GetTreeOptionList()
        {
            var data = await _helper.GetTreeOptionListAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        // [HttpGet("getAllActive/{pageIndex}/{pageSize}/{search?}")]
        // public async Task<IActionResult> GetAllActive(int pageIndex, int pageSize, string? search = null)
        // {
        //     if (pageIndex < 1 || pageSize < 1)
        //         return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
        //     var data = await _helper.GetAllActiveAsync(pageIndex, pageSize, search);
        //     return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        // }

        [HttpGet("getAllDeleted/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAllDeleted(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllDeletedAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] UnitDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool isSymbolExists = await _helper.IsSymbolExistsAsync(model.Symbol);
            if (isSymbolExists)
                return Failed(Common.EStatusCodes.Conflict, _localizer["symbolAlreadyExists"]);
            var userName = User.Identity?.Name;
            var result = await _helper.CreateAsync(model, userName);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UnitDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.UpdateAsync(model, userName);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }

        [HttpPut("softDelete/{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _helper.SoftDeleteAsync(id, userName);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["softDeleteSuccess"]);
        }

        [HttpPut("restore/{id}")]
        public async Task<IActionResult> Restore(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _helper.RestoreAsync(id, userName);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["restoreSuccess"]);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }
    }
}
