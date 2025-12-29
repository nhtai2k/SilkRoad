using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess.DTOs;
using Common.Models.BOMModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.BOMControllers
{
    [ApiController]
    [Route("api/bom/[controller]")]
    [Authorize]
    public class PropertyController : BaseApiController
    {
        private readonly IPropertyHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public PropertyController(IPropertyHelper helper, IStringLocalizer<SharedResource> localizer) { _helper = helper; _localizer = localizer; }

        [HttpGet("getAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("getByFilter")]
        public async Task<IActionResult> GetByFilter([FromBody] PropertyFilterModel model)
        {
            if (model.PageIndex < 1 || model.PageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetByFilterAsync(model);
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

        //[HttpGet("getByPropertyTypeId/{propertyTypeId}")]
        //public async Task<IActionResult> GetByPropertyTypeId(int propertyTypeId)
        //{
        //    var data = await _helper.GetByPropertyTypeIdAsync(propertyTypeId);
        //    if (data == null)
        //        return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}


        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] PropertyDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool codeExists = await _helper.IsCodeExistsAsync(model.Code);
            if (codeExists)
                return Failed(Common.EStatusCodes.Conflict, _localizer["codeAlreadyExists"]);
            var userName = User.Identity?.Name;
            var result = await _helper.CreateAsync(model, userName);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromForm] PropertyDTO model)
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
