using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Common.Services.JwtServices;
using Common.ViewModels.SurveyViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using SurveyBusinessLogic.IHelpers;
using WebCore.Server;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyFormController : BaseApiController
    {
        //private readonly ISurveyFormHelper _surveyFormHelper;
        //private readonly IJwtService _jwtService;
        //private readonly IActionloggingService _actionLog;
        //private readonly IStringLocalizer<SharedResource> _localizer;
        //public SurveyFormController(ISurveyFormHelper surveyFormHelper, IJwtService jwtService, IActionloggingService actionLog, IStringLocalizer<SharedResource> localizer)
        //{
        //    _surveyFormHelper = surveyFormHelper;
        //    _jwtService = jwtService;
        //    _actionLog = actionLog;
        //    _localizer = localizer;
        //}

        //[HttpGet("GetAll")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetAll(int pageIndex = 1, int pageSize = 10)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    var controllerName = ControllerContext.ActionDescriptor.ControllerName;
        //    if (pageIndex < 1)
        //    {
        //        _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
        //    }
        //    Pagination<SurveyFormViewModel> data = await _surveyFormHelper.GetAllAsync(pageIndex, pageSize);
        //    _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}

        //[HttpGet("GetAllActive")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetAllActive()
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    var controllerName = ControllerContext.ActionDescriptor.ControllerName;
        //    IEnumerable<SurveyFormViewModel> data = await _surveyFormHelper.GetAllActiveAsync();
        //    _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}

        //[HttpGet("GetById/{id}")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    var data = await _surveyFormHelper.GetByIdAsync(id);
        //    if (data == null)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}

        //[HttpGet("GetEagerById/{id}")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetEagerById(int id)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    var data = _surveyFormHelper.GetEagerSurveyFormByID(id);
        //    if (data == null)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}

        //[HttpGet("GetEagerUIById/{id}")]
        //[AllowAnonymous]
        //public async Task<IActionResult> GetEagerUIById(int id)
        //{
        //    var data = await _surveyFormHelper.GetEagerSurveyUIByID(id, ELanguages.VN.ToString());
        //    return Ok(data);
        //}

        //[HttpPost("Create")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.Create, EModule.Survey)]
        //public async Task<IActionResult> Create([FromBody] SurveyFormViewModel model)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    if (!ModelState.IsValid)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Failed, model);
        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
        //    }
        //    bool result = await _surveyFormHelper.CreateAsync(model);
        //    if (!result)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Failed, model);
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataCreationFailed"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Create, EUserActionStatus.Successful, model);
        //    return Succeeded(_localizer["dataCreatedSuccessfully"]);
        //}

        //[HttpPut("Update")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.Update, EModule.Survey)]
        //public async Task<IActionResult> Update([FromBody] SurveyFormViewModel model)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    if (!ModelState.IsValid)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Failed, model);
        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
        //    }
        //    bool result = await _surveyFormHelper.UpdateAsync(model);
        //    if (!result)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Failed, model);
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataUpdateFailed"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Update, EUserActionStatus.Successful, model);
        //    return Succeeded(_localizer["dataUpdatedSuccessfully"]);
        //}

        //[HttpPatch("SoftDelete/{id}")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyForm, ERoleClaim.SoftDelete, EModule.Survey)]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    bool result = await _surveyFormHelper.SoftDeleteAsync(id);
        //    if (!result)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Delete, EUserActionStatus.Failed, id);
        //        return Failed(EStatusCodes.BadRequest, _localizer["dataDeletionFailed"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Delete, EUserActionStatus.Successful, id);
        //    return Succeeded(_localizer["dataDeletedSuccessfully"]);
        //}
    }
}
