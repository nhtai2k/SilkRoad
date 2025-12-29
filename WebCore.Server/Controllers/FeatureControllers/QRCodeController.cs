using BusinessLogic.IHelpers.IFeatureHelper;
using Common;
using Common.Services.ActionLoggingServices;
using Common.ViewModels.QRViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.FeatureControllers
{
    [Route("api/feature/[controller]")]
    [ApiController]
    [Authorize]
    public class QRCodeController : BaseApiController
    {
        private readonly IQRCodeHelper _qrCodeHelper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public QRCodeController(IQRCodeHelper qrCodeHelper,
            IActionLoggingService actionLog,
            IStringLocalizer<SharedResource> localizer)
        {
            _qrCodeHelper = qrCodeHelper;
            _localizer = localizer;
            _actionLog = actionLog;
        }

        [HttpGet]
        [Route("GetAllFonts")]
        public async Task<IActionResult> GetAllFonts()
        {
            try
            {
                string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                string controllerName = ControllerContext.ActionDescriptor.ControllerName;
                // _actionLog.CreateAsync(token, controllerName, EUserAction.View, EUserActionStatus.Successful, null);
                var fonts = await _qrCodeHelper.GetAllFontsAsync();
                return Succeeded(fonts, _localizer["getDataSuccess"]);
            }
            catch (Exception ex)
            {
                return Failed(EStatusCodes.InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("GenerateAQRCode")]
        public async Task<IActionResult> GenerateAQRCode([FromForm] QRCodeViewModel model)
        {
            try
            {
                string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                string controllerName = ControllerContext.ActionDescriptor.ControllerName;
                if (!ModelState.IsValid)
                {
                    // _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                    return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
                }
                // _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
                // Generate the QR code as a base64 string
                byte[] fileBytes = await _qrCodeHelper.GenerateQRCodeAsync(model);
                // Return the byte array as a PNG image
                return File(fileBytes, "image/png");
            }
            catch (Exception ex)
            {
                return Failed(EStatusCodes.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("GenerateListQRCode")]
        [AuthorizeEnumPolicy(ERoles.Admin)]
        public async Task<IActionResult> GenerateListQRCode([FromForm] QRCodeListViewModel model)
        {
            try
            {
                string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                string controllerName = ControllerContext.ActionDescriptor.ControllerName;
                if (!ModelState.IsValid)
                {
                    // _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Failed, model);
                    return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
                }
                // _actionLog.CreateAsync(token, controllerName, EUserAction.Create, EUserActionStatus.Successful, model);
                string filePath = await _qrCodeHelper.GenerateListQRCodeAsync(model);
                var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                var fileName = Path.GetFileName(filePath);
                return File(fileBytes, "application/zip", fileName);
            }
            catch (Exception ex)
            {
                return Failed(EStatusCodes.InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("MergeImage")]
        //public async Task<IActionResult> MergeImage([FromForm] MergeImageViewModel model)
        //{
        //    if (model == null)
        //    {
        //        return BadRequest();
        //    }
        //    string filePath = await _qrCodeHelper.MergeImage(model);
        //    if (string.IsNullOrEmpty(filePath))
        //    {
        //        return BadRequest();
        //    }
        //    var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
        //    var fileName = Path.GetFileName(filePath);
        //    return File(fileBytes, "application/zip", fileName);
        //}
    }
}
