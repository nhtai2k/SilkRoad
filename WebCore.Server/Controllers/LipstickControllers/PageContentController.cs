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
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [Authorize]
    public class PageContentController : BaseApiController
    {
        private readonly IPageContentHelper _pageContentHelper;
        private readonly IActionLoggingService _actionLog;
        public readonly IStringLocalizer<SharedResource> _localizer;
        public PageContentController(IPageContentHelper pageContentHelper, IStringLocalizer<SharedResource> localizer, IActionLoggingService actionLog)
        {
            _pageContentHelper = pageContentHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }
        //[HttpGet]
        //[Route("getAllPageType")]
        //public IActionResult GetAllPageType()
        //{
        //    var data = Enum.GetValues(typeof(EPageType)).Cast<EPageType>().Select(x => new PageTypeViewModel { Id = (int)x, Name = _stringLocalizer[EnumHelper.GetDisplayName(x)] }).ToList();

        //    return Ok(data);
        //}

        [HttpGet]
        [Route("getAll/{pageIndex}/{pageSize}/{pageTypeId}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize, int pageTypeId)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (pageIndex < 1)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<PageContentViewModel> data = await _pageContentHelper.GetAllAsync(pageIndex, pageSize);
            //_actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpGet]
        [Route("getByPageTypeId/{pageTyeId}")]
        public IActionResult GetByPageTypeId(int pageTyeId = -1)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            IEnumerable<PageContentViewModel> data = _pageContentHelper.GetByPageTypeId(pageTyeId);
            //_actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.View, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet]
        [Route("getById/{Id}")]
        public IActionResult GetById(int Id)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var data = _pageContentHelper.GetById(Id);
            if (data == null)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
                return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
            }
            //_actionLog.CreateAsync(token, controllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }
        [HttpPost]
        [Route("create")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Create([FromBody] PageContentViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _pageContentHelper.Create(model);
            if (!result)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
            }
            //_actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataCreatedSuccessfully"]);
        }
        [HttpPut]
        [Route("update")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Update([FromBody] PageContentViewModel model)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            if (!ModelState.IsValid)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            }
            var result = _pageContentHelper.Update(model);
            if (!result)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Failed, model);
                return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
            }

            //_actionLog.CreateAsync(token, controllerName, EUserAction.Update, EUserActionStatus.Successful, model);
            return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        }
        [HttpDelete]
        [Route("delete")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public IActionResult Delete(int Id)
        {
            //if (Id == 0)
            //{
            //    return BadRequest();
            //}
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            string controllerName = ControllerContext.ActionDescriptor.ControllerName;
            var result = _pageContentHelper.Delete(Id);
            if (!result)
            {
                //_actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, Id);
                return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
            }
            //_actionLog.CreateAsync(token, controllerName, EUserAction.Delete, EUserActionStatus.Failed, Id);
            return Succeeded(_localizer["dataDeletedSuccessfully"]);
        }
    }
}
