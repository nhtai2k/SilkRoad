using BusinessLogic.IHelpers.ISystemHelpers;
using ClosedXML.Excel;
using Common.Models;
using Common.ViewModels.SystemViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SystemControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : BaseApiController
    {
        private readonly IRoleHelper _helper;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public RoleController(IRoleHelper helper, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _localizer = localizer;
        }
        /// <summary>
        /// Get all data
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        [HttpGet("GetAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            Pagination<RoleViewModel> data = await _helper.GetAllAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("getOptionList")]
        public async Task<IActionResult> GetOptionList()
        {
            var data = await _helper.GetOptionListAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet("GetAllActive")]
        public async Task<IActionResult> GetAllActive()
        {
            var data = await _helper.GetAllActiveAsync();
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        /// <summary>
        /// Get data by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            RoleViewModel data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataNotFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        /// <summary>
        /// Create data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        [AuthorizeEnumPolicy(Common.ERoles.Admin)]
        public async Task<IActionResult> Create([FromBody] RoleViewModel model)
        {
            if (!ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool result = await _helper.CreateAsync(model);
            if (!result)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }
        /// <summary>
        /// Update data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("Update")]
        [AuthorizeEnumPolicy(Common.ERoles.Admin)]
        public async Task<IActionResult> Update([FromBody] RoleViewModel model)
        {
            if (!ModelState.IsValid)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidData"]);
            bool result = await _helper.UpdateAsync(model);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataUpdateFailed"]);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
        /// <summary>
        /// Soft delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPatch("SoftDelete/{id}")]
        [AuthorizeEnumPolicy(Common.ERoles.Admin)]
        public async Task<IActionResult> SoftDelete(int id)
        {
            bool result = await _helper.SoftDeleteAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataDeletionFailed"]);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
        /// <summary>
        /// Restore data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPatch("Restore/{id}")]
        [AuthorizeEnumPolicy(Common.ERoles.Admin)]
        public async Task<IActionResult> Restore(int id)
        {
            bool result = await _helper.RestoreAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataRestorationFailed"]);
            return Succeeded(_localizer["dataRestoredSuccessfully"]);
        }
        /// <summary>
        /// delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("Delete/{id}")]
        [AuthorizeEnumPolicy(Common.ERoles.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            bool result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(Common.EStatusCodes.NotFound, _localizer["dataDeletionFailed"]);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
    }
}
