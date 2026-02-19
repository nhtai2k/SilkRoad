using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.BLL.IHelpers.ISystemHelpers;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.SystemViewModels;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SystemControllers
{
    [Route("api/system/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly IUserHelper _userSystemHelper;
        public readonly IStringLocalizer<SharedResource> _localizer;
        public UserController(IUserHelper userSystemHelper, IStringLocalizer<SharedResource> localizer)
        {
            _userSystemHelper = userSystemHelper;
            _localizer = localizer;
        }
        /// <summary>
        /// Get all data
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        //[HttpGet("GetAll/{pageIndex}/{pageSize}")]
        //public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        //{
        //    if (pageIndex < 1)
        //    {
        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
        //    }
        //    Pagination<UserViewModel> data = await _userSystemHelper.GetAllAsync(pageIndex, pageSize);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}
        [HttpGet("GetAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize, int roleId = -1, string textSearch = "")
        {
            if (pageIndex < 1)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<UserViewModel> data = await _userSystemHelper.GetAllAsync(pageIndex, pageSize, roleId, textSearch);
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
            //string? refreshToken = Request.Cookies["refresh_token"];

            var data = await _userSystemHelper.GetByIdAsync(id);
            if (data == null)
            {
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        /// <summary>
        /// Create data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> Create([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            bool result = await _userSystemHelper.CreateAsync(model);
            if (!result)
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        /// <summary>
        /// Update data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("Update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> Update([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            bool result = await _userSystemHelper.UpdateAsync(model);
            if (!result)
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

        /// <summary>
        /// Soft delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //[HttpPatch("SoftDelete/{id}")]
        //[AuthorizeEnumPolicy(ERoles.Admin)]
        //public async Task<IActionResult> SoftDelete(int id)
        //{
        //    var result = await _userSystemHelper.SoftDeleteAsync(id);
        //    if (!result)
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataSoftDeleteFailed"]);
        //    return Succeeded(_localizer["dataSoftDeletedSuccessfully"]);
        //}

        /// <summary>
        /// Restore data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //[HttpPatch("Restore/{id}")]
        //[AuthorizeEnumPolicy(ERoles.Admin)]
        //public async Task<IActionResult> Restore(int id)
        //{
        //    bool result = await _userSystemHelper.RestoreAsync(id);
        //    if (!result)
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataRestoreFailed"]);
        //    return Succeeded(_localizer["dataRestoredSuccessfully"]);
        //}

        /// <summary>
        /// Delete data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //[HttpDelete("Delete/{id}")]
        //[AuthorizeEnumPolicy(ERoles.Admin)]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    bool result = await _userSystemHelper.DeleteAsync(id);
        //    if (!result)
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataDeleteFailed"]);
        //    return Succeeded(_localizer["dataDeletedSuccessfully"]);
        //}

        [HttpPut("deactivateUser/{Id}")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> DeactivateUser(int Id)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var userName = User.Identity?.Name;
            bool result = await _userSystemHelper.DeactivateUserAsync(Id, userName);
            if (!result)
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

        [HttpPut("activateUser/{Id}")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> ActivateUser(int Id)
        {
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var userName = User.Identity?.Name;
            bool result = await _userSystemHelper.ActivateUserAsync(Id, userName);
            if (!result)
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

    }
}
