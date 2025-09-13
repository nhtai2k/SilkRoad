//using BusinessLogic.IHelpers.IQMSHelpers;
//using Common;
//using Common.Models;
//using DataAccess.QMSDTOs;
//using WebCore.Server.Controllers.BaseApiControllers;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Localization;

//namespace WebCore.Server.Controllers.RestaurantControllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class ReservationController : BaseApiController
//    {
//        private readonly IReservationHelper _helper;
//        private readonly ILogger<ReservationController> _logger;
//        private readonly IStringLocalizer<SharedResource> _localizer;
//        public ReservationController(
//            IReservationHelper helper,
//            ILogger<ReservationController> logger,
//            IStringLocalizer<SharedResource> localizer)
//        {
//            _helper = helper;
//            _logger = logger;
//            _localizer = localizer;
//        }

//        //[HttpGet("getAll/{pageIndex}/{pageSize}")]
//        //public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
//        //{
//        //    if (pageIndex < 1 || pageSize < 1)
//        //    {
//        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
//        //    }
//        //    Pagination<ReservationDTO> data = await _helper.GetAllAsync(pageIndex, pageSize);
//        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
//        //}

//        [HttpPost("getByFilter")]
//        public async Task<IActionResult> GetByFilter([FromBody]ReservationFilterModel model)
//        {
//            if (model.PageIndex < 1 || model.PageSize < 1)
//            {
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
//            }
//            Pagination<ReservationDTO> data = await _helper.GetByFilterAsync(model);
//            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
//        }

//        //[HttpGet("getAllDeleted/{pageIndex}/{pageSize}")]
//        //public async Task<IActionResult> GetAllDeleted(int pageIndex, int pageSize)
//        //{
//        //    if (pageIndex < 1 || pageSize < 1)
//        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
//        //    var data = await _helper.GetAllDeletedAsync(pageIndex, pageSize);
//        //    return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
//        //}

//        [HttpGet("getById/{id}")]
//        public async Task<IActionResult> GetById(int id)
//        {
//            var data = await _helper.GetByIdAsync(id);
//            if (data == null)
//                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//            return Succeeded<ReservationDTO>(data, _localizer["dataFetchedSuccessfully"]);
//        }

//        [HttpPost("Booking")]
//        [AllowAnonymous]
//        public  IActionResult Booking([FromBody] ReservationDTO model)
//        {
//            if (model == null || !ModelState.IsValid)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//            string code = _helper.Booking(model);
//            if (string.IsNullOrEmpty(code))
//                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
//            return Succeeded(code,_localizer["createSuccess"]);
//        }

//        [HttpPost("create")]
//        public async Task<IActionResult> Create([FromBody] ReservationDTO model)
//        {
//            if (model == null || !ModelState.IsValid)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//            var userName = User.Identity?.Name;
//            var result = await _helper.CreateAsync(model, userName);
//            if (!result)
//                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
//            return Succeeded(_localizer["createSuccess"]);
//        }

//        [HttpPut("CheckIn")]
//        public async Task<IActionResult> CheckIn([FromBody] CheckInModel model)
//        {
//            if (model == null || !ModelState.IsValid)
//                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//            var userName = User.Identity?.Name;
//            var result = await _helper.CheckInAsync(model, userName);
//            if (!result)
//                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
//            return Succeeded(_localizer["updateSuccess"]);
//        }

//        [HttpGet("CheckOut/{Id}")]
//        public async Task<IActionResult> CheckOut(int Id)
//        {
//            var userName = User.Identity?.Name;
//            var result = await _helper.CheckOutAsync(Id, userName);
//            if (!result)
//                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
//            return Succeeded(_localizer["updateSuccess"]);
//        }

//        //[HttpPut("update")]
//        //public async Task<IActionResult> Update([FromBody] ReservationDTO model)
//        //{
//        //    if (model == null || !ModelState.IsValid)
//        //        return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
//        //    var userName = User.Identity?.Name;
//        //    var result = await _helper.UpdateAsync(model, userName);
//        //    if (!result)
//        //        return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
//        //    return Succeeded(_localizer["updateSuccess"]);
//        //}

//        //[HttpPut("softDelete/{id}")]
//        //public async Task<IActionResult> SoftDelete(int id)
//        //{
//        //    var userName = User.Identity?.Name;
//        //    var result = await _helper.SoftDeleteAsync(id, userName);
//        //    if (!result)
//        //        return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//        //    return Succeeded(_localizer["softDeleteSuccess"]);
//        //}

//        //[HttpPut("restore/{id}")]
//        //public async Task<IActionResult> Restore(int id)
//        //{
//        //    var userName = User.Identity?.Name;
//        //    var result = await _helper.RestoreAsync(id, userName);
//        //    if (!result)
//        //        return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//        //    return Succeeded(_localizer["restoreSuccess"]);
//        //}

//        //[HttpDelete("delete/{id}")]
//        //public async Task<IActionResult> Delete(int id)
//        //{
//        //    var result = await _helper.DeleteAsync(id);
//        //    if (!result)
//        //        return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
//        //    return Succeeded(_localizer["deleteSuccess"]);
//        //}
//    }
//}
