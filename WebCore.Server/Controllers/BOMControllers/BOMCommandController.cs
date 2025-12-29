using BusinessLogic.IBOMHelpers;
using DataAccess.BOMDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Org.BouncyCastle.Bcpg.OpenPgp;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.BOMControllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BOMCommandController : BaseApiController
    {
        private readonly IBOMQueryHelper _queryHelper;
        private readonly IBOMCommandHelper _commandHelper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public BOMCommandController(IBOMQueryHelper queryHelper,
            IBOMCommandHelper commandHelper,
            IStringLocalizer<SharedResource> localizer)
        {
            _queryHelper = queryHelper;
            _commandHelper = commandHelper;
            _localizer = localizer;
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] BOMDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool codeExists = await _queryHelper.IsCodeExistsAsync(model.Code);
            if (codeExists)
                return Failed(Common.EStatusCodes.Conflict, _localizer["codeAlreadyExists"]);
            var userName = User.Identity?.Name;
            var result = await _commandHelper.CreateAsync(model, userName);
            if (result == null)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(result, _localizer["createSuccess"]);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] BOMDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _commandHelper.UpdateAsync(model, userName);
            if (!result)
                return Failed(Common.EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }

        [HttpPut("softDelete/{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _commandHelper.SoftDeleteAsync(id, userName);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["softDeleteSuccess"]);
        }

        [HttpPut("restore/{id}")]
        public async Task<IActionResult> Restore(int id)
        {
            var userName = User.Identity?.Name;
            var result = await _commandHelper.RestoreAsync(id, userName);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["restoreSuccess"]);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _commandHelper.DeleteAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }    
    }
}
