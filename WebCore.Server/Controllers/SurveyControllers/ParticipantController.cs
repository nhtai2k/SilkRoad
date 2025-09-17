using Microsoft.AspNetCore.Mvc;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.SurveyControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : BaseApiController
    {
        //private readonly IParticipantHelper _participantHelper;
        //private readonly IActionloggingService _actionLog;
        //private readonly IStringLocalizer<SharedResource> _localizer;
        //public ParticipantController(IParticipantHelper participant, IActionloggingService actionLog, IStringLocalizer<SharedResource> localizer)
        //{
        //    _participantHelper = participant;
        //    _actionLog = actionLog;
        //    _localizer = localizer;
        //}
        //[HttpGet("GetAll")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyResult, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetAll(DateTime? startDate, DateTime? endDate, int surveyFormId = -1, int pageIndex = 1, int pageSize = 10)
        //{

        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    string controllerName = ControllerContext.ActionDescriptor.ControllerName;
        //    if (pageIndex < 1)
        //    {
        //        _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
        //    }
        //    Pagination<ParticipantViewModel> data = await _participantHelper.GetAllAsync(startDate, endDate, surveyFormId, pageIndex, pageSize);
        //    _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful);
        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}
        //[HttpPost("Create")]
        //[AllowAnonymous]
        //public async Task<IActionResult> Create([FromBody] SurveyUIViewModel model)
        //{
        //    await _participantHelper.CreateAsync(model);
        //    return Ok();
        //}
        //[HttpGet("GetEagerById/{id}")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyResult, ERoleClaim.View, EModule.Survey)]
        //public async Task<IActionResult> GetEagerById(int id)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    var data = _participantHelper.GetEagerCustomerSurveyByID(id);
        //    if (data == null)
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.ViewDetails, EUserActionStatus.Successful);

        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        //}
        //[HttpGet("ExportExcel")]
        ////[AuthorizeEnumPolicy(ERoleClaimGroup.SurveyResult, ERoleClaim.Export, EModule.Survey)]
        //public async Task<IActionResult> ExportExcel(DateTime? startTime, DateTime? finishTime, int surveyFormId)
        //{
        //    string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        //    string path = await _participantHelper.ExportExcel(startTime, finishTime, surveyFormId);
        //    if (string.IsNullOrEmpty(path))
        //    {
        //        _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Export, EUserActionStatus.Failed);
        //        return Failed(EStatusCodes.NotFound, _localizer["dataNotFound"]);
        //    }
        //    _actionLog.CreateAsync(token, ControllerContext.ActionDescriptor.ControllerName, EUserAction.Export, EUserActionStatus.Successful);
        //    var fileBytes = await System.IO.File.ReadAllBytesAsync(path);
        //    var fileName = Path.GetFileName(path);
        //    //return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        //    return Succeeded(File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName), _localizer["dataFetchedSuccessfully"]);
        //}
    }
}
