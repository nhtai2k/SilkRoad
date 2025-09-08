using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.LipstickControllers
{
    [Route("api/Product")]
    [ApiController]
    [Authorize]
    public class ProductController : BaseApiController
    {
        private readonly IProductHelper _productHelper;
        private readonly IActionloggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ProductController(IProductHelper productHelper, IStringLocalizer<SharedResource> localizer, IActionloggingService actionLog)
        {
            _productHelper = productHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAll(string? nameVN, string? nameEN,
            int categoryId, int subCategoryId, int brandId,
            int sizeId, int colorId, int pageIndex, int pageSize)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<ProductViewModel> data = await _productHelper.GetAllAsync(nameVN, nameEN, categoryId, subCategoryId, brandId, sizeId, colorId, pageIndex, pageSize);
            _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getById/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            ProductViewModel data = await _productHelper.GetByIdAsync(Id);
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
        public async Task<IActionResult> Create([FromForm] ProductViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed,model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _productHelper.CreateAsync(model);
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
        public async Task<IActionResult> Update([FromForm] ProductViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed,model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = await _productHelper.UpdateAsync(model);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed,model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful,model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
        [HttpDelete]
        [Route("delete")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> DeleteProductByID(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var result = await _productHelper.DeleteAsync(Id);
            if (!result)
            {
                _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, Id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            _actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Successful, Id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
        [HttpGet]
        [Route("suggestProductBySearchText/{searchText}")]
        public async Task<IActionResult> SuggestProductBySearchText(string searchText)
        {
            var data = await _productHelper.SuggestProductBySearchTextAsync(ELanguages.VN.ToString(), searchText);
            if (data == null)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["dataNotFound"]);
            }
            return Succeeded<IEnumerable<ProductViewModel>>(data, _localizer["dataFetchedSuccessfully"]);
        }
        //[HttpGet]
        //[Route("checkPermissionToDelete")]
        //public async Task<IActionResult> CheckPermissionToDelete(string ID)
        //{
        //    DatabaseOjectResult databaseOjectResult = new DatabaseOjectResult();
        //    databaseOjectResult.OK = await _productHelper.CheckPermissionToDelete(ID);
        //    return Ok(databaseOjectResult);
        //}
        //[HttpDelete]
        //[Route("softDeleteProduct")]
        //public async Task<IActionResult> SoftDeleteProductByID(string ID)
        //{
        //    if (ID == null)
        //    {
        //        return BadRequest();
        //    }
        //    await _productHelper.SoftDeleteProductByID(ID);

        //    return Ok();
        //}
        //[HttpPatch]
        //[Route("restoreProduct")]
        //public async Task<IActionResult> RestoreProductByID(string ID)
        //{
        //    if (ID == null)
        //    {
        //        return BadRequest();
        //    }
        //    await _productHelper.RestoreProductByID(ID);

        //    return Ok();
        //}
    }
}
