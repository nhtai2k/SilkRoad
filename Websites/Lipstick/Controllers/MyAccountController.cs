using Common;
using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Lipstick.ViewModels;
using MemberBusinessLogic.IHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;

namespace Lipstick.Controllers
{
    [Authorize]
    public class MyAccountController : Controller
    {
        #region Contructor
        private readonly LayoutHelper _layoutHelper;
        private readonly IFavoriteHelper _favoriteHelper;
        private readonly ProductService _productService;
        private readonly ProvinceHelper _provinceHelper;
        private readonly IGenderHelper _genderHelper;
        private readonly IStringLocalizer<Message> _message;
        private readonly IMyAccountHelper _myAccountHelper;
        public MyAccountController(LayoutHelper layoutHelper,
            ProductService productService,
            ProvinceHelper provinceHelper,
            IGenderHelper genderHelper,
            IMyAccountHelper myAccountHelper,
            IStringLocalizer<Message> message,
            IFavoriteHelper favoriteHelper)
        {
            _layoutHelper = layoutHelper;
            _favoriteHelper = favoriteHelper;
            _productService = productService;
            _provinceHelper = provinceHelper;
            _genderHelper = genderHelper;
            _message = message;
            _myAccountHelper = myAccountHelper;
        }
        #endregion
        
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            MyAccountClientViewModel model = new MyAccountClientViewModel();
            string languageCode = Global.GetLanguageCode(Request);
            var genders = _genderHelper.GetAll(languageCode);
            int userId = int.Parse(User.Claims.First().Value);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            model.FavoriteProducts = await _productService.GetFavoritedProduct(languageCode, userId, 1, 8);
            model.UserInfor = await _myAccountHelper.GetUserByIdAsync(userId);
            ViewBag.Genders = new SelectList(genders, "Id", "Name");
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateUserInformation([FromForm] UserClientViewModel model)
        {
            DataObjectResult result = new DataObjectResult();
            result.Message = _message["errorModel"];

            ToastItem toastItem = new ToastItem();
            toastItem.Message = result.Message;
            toastItem.BackgroundStyle = EToastBackgroundColor.error.ToString();

            string userId = User.Claims.First().Value;
            string languageCode = Global.GetLanguageCode(Request);
            var genders = _genderHelper.GetAll(languageCode);
            ViewBag.Genders = new SelectList(genders, "Id", "Name");
            if (string.IsNullOrEmpty(userId) || !ModelState.IsValid)
            {
                result.Data = JsonConvert.SerializeObject(new { 
                    UpdateComponent = Global.RenderRazorViewToString(this, "PartialViews/_UpdateAccountPartialView", model),
                    ToastComponent = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem)
                }).ToString();
                return Ok(result);
            }

            result.OK = await _myAccountHelper.UpdateAsync(model);
            if (result.OK)
            {
                result.Message = _message["updateSuccess"];
                toastItem.BackgroundStyle = EToastBackgroundColor.success.ToString();
            }
            else
            {
                result.Message = _message["updateFail"];
            }

            toastItem.Message = result.Message;
            result.Data = JsonConvert.SerializeObject(new { ToastComponent = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem) }).ToString();

            return Ok(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword([FromForm] ChangePasswordClientViewModel model)
        {
            DataObjectResult result = new DataObjectResult();
            ToastItem toastItem = new ToastItem();
            string userId = User.Claims.First().Value;
            string toastPartialView;
            string changePasswordPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ChangePasswordPartialView", model);
            if (string.IsNullOrEmpty(userId) || !ModelState.IsValid)
            {
                //changePasswordPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ChangePasswordPartialView",model);
                result.Message = _message["changePasswordFail"];
                toastItem.BackgroundStyle = EToastBackgroundColor.error.ToString();
                toastItem.Message = result.Message;
                toastPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem);
                result.Data = JsonConvert.SerializeObject(new
                {
                    ChangePasswordPartialView = changePasswordPartialView,
                    ToastPartialView = toastPartialView
                }).ToString();
                return Ok(result);
            }
            var identityResult = await _myAccountHelper.ChangePasswordAsync(int.Parse(userId), model);
            if(identityResult.Succeeded)
            {
                result.OK = true;
                //changePasswordPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ChangePasswordPartialView", model);
                result.Message = _message["changePasswordSuccess"];
                toastItem.BackgroundStyle = EToastBackgroundColor.success.ToString();
            }
            else
            {
                result.OK = false;
                ModelState.AddModelError("", _message["oldPasswordIncorrect"]);
                //changePasswordPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ChangePasswordPartialView", model);
                result.Message = _message["changePasswordFail"];
                toastItem.BackgroundStyle = EToastBackgroundColor.error.ToString();
            }
            toastItem.Message = result.Message;
            toastPartialView = Global.RenderRazorViewToString(this, "PartialViews/_ToastPartialView", toastItem);
            result.Data = JsonConvert.SerializeObject(new
            {
                ChangePasswordPartialView = changePasswordPartialView,
                ToastPartialView = toastPartialView
            }).ToString();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult HandleFavoriteProduct([FromHeader]int productId)
        {
            DataObjectResult result = new DataObjectResult();
            string userId = User.Claims.First().Value;
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest();
            }
            result.OK =  _favoriteHelper.HandleFavoriteProduct(productId, int.Parse(userId));
            return Ok(result);
        }

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult GetInformationToInitSelect()
        //{
        //    DataObjectResult result = new DataObjectResult();
        //    var userIdTemp = User.Claims.FirstOrDefault()?.Value ?? "-1";
        //    int userId = int.Parse(userIdTemp);
        //    var user = _myAccountHelper.GetUserById(userId);
        //    var provinces = _provinceHelper.GetProvinces();
        //    result.OK = true;
        //    result.Data = JsonConvert.SerializeObject(new { 
        //        ProvinceId = user?.ProvinceId ?? -1, 
        //        DistrictId = user?.DistrictId ?? -1,
        //        Provinces = provinces.Count == 0 ? null : provinces
        //    }).ToString();
        //    return Ok(result);
        //}

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetProvinces()
        {
            DataObjectResult result = new DataObjectResult();
            var provinces = _provinceHelper.GetProvinces();
            if (provinces == null || provinces.Count == 0)
            {
                result.OK = false;
                result.Message = "No data";
                return NotFound(result);
            }
            else
            {
                result.OK = true;
                result.Data = JsonConvert.SerializeObject(provinces);
                return Ok(result);
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetFavoriteProducts(int pageIndex, int pageSize)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            int userId = int.Parse(User.Claims.First().Value);
            var data = await _productService.GetFavoritedProduct(languageCode, userId, pageIndex, pageSize);
            if (data != null)
            {
                result.OK = true;
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_ProductListPartialView", data.Items);
                return Ok(result);
            }
            return Ok(result);
        }
    }
}
