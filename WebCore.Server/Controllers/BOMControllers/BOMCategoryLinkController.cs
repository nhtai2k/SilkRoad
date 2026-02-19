using BOM.BLL.IHelpers;
using BOM.DAL.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Share;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.BOMControllers
{
    [Route("api/bom/[controller]")]
    [ApiController]
    public class BOMCategoryLinkController : BaseApiController
    {
        private readonly IBOMCategoryLinkHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public BOMCategoryLinkController(IBOMCategoryLinkHelper helper, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }

        [HttpGet("getMaterialListByBomCategoryId")]
        public async Task<IActionResult> GetMaterialList(Guid bomCategoryId)
        {
            if (bomCategoryId == Guid.Empty)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var data = await _helper.GetMaterialListByBomCategoryIdAsync(bomCategoryId);
            return Succeeded(data, _localizer["createSuccess"]);
        }

        [HttpPost("addMaterial")]
        public async Task<IActionResult> AddMaterial(BOMMaterialLinkDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.AddMaterialAsync(model);
            if (result == null)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(result, _localizer["createSuccess"]);
        }

        [HttpGet("getPropertyListByBomCategoryId")]
        public async Task<IActionResult> GetPropertyList(Guid bomCategoryId)
        {
            if (bomCategoryId == Guid.Empty)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var data = await _helper.GetPropertyListByBomCategoryIdAsync(bomCategoryId);
            return Succeeded(data, _localizer["createSuccess"]);
        }

        [HttpPost("addProperty")]
        public async Task<IActionResult> AddPriority(BOMPropertyLinkDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var result = await _helper.AddPropertyAsync(model);
            if (result == null)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(result, _localizer["createSuccess"]);
        }

        [HttpPut("deleteMaterial")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
            var result = await _helper.DeleteMaterialByIdAsync(id);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }

        [HttpPut("deleteProperty")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            var result = await _helper.DeletePropertyByIdAsync(id);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }
    }
}
