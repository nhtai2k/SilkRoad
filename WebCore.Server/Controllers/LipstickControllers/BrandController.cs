using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.LipstickControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BrandController : BaseApiController
    {
        private readonly IBrandHelper _brandHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public BrandController(IBrandHelper brandHelper, IStringLocalizer<SharedResource> localizer, IActionloggingService actionLog)
        {
            _brandHelper = brandHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }

        [HttpGet]
        [Route("getAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex = 1, int pageSize = 0)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<BrandViewModel> data = await _brandHelper.GetAllAsync(pageIndex, pageSize);
            if (data == null)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet]
        [Route("getAllActive")]
        public IActionResult GetAllActive()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<BrandViewModel> data = _brandHelper.GetAllActive();
            _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet]
        [Route("getById/{Id}")]
        public IActionResult GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var data = _brandHelper.GetById(Id);
            if (data == null)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost]
        [Route("create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Create([FromForm] BrandViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _brandHelper.Create(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }

        [HttpPut]
        [Route("update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Update([FromForm] BrandViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _brandHelper.Update(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }

            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }

        [HttpDelete]
        [Route("deleteBrand")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult DeleteBrandByID(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var result = _brandHelper.Delete(Id);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, Id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Successful, Id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
        //[HttpGet]
        //[Route("checkPermissionToDelete")]
        //public async Task<IActionResult> CheckPermissionToDelete(string ID)
        //{
        //    DatabaseOjectResult databaseOjectResult = new DatabaseOjectResult();
        //    databaseOjectResult.OK = await _brandHelper.CheckPermissionToDelete(ID);
        //    return Ok(databaseOjectResult);
        //}
        //[HttpDelete]
        //[Route("softDeleteBrand")]
        //public async Task<IActionResult> SoftDeleteBrandByID(string ID)
        //{
        //    if (ID == null)
        //    {
        //        return BadRequest();
        //    }
        //    await _brandHelper.SoftDeleteBrandByID(ID);

        //    return Ok();
        //}
        //[HttpPatch]
        //[Route("restoreBrand")]
        //public async Task<IActionResult> RestoreBrandByID(string ID)
        //{
        //    if (ID == null)
        //    {
        //        return BadRequest();
        //    }
        //    await _brandHelper.RestoreBrandByID(ID);

        //    return Ok();
        //}
    }
}
