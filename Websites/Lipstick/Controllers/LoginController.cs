using Lipstick._Convergence.Helpers;
using Member.BLL.IHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.Controllers
{
    public class LoginController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        private readonly ILoginHelper _loginHelper;
        private readonly IRegisterHelper _registerHelper;
        public LoginController(LayoutHelper layoutHelper, ILoginHelper loginHelper, IRegisterHelper registerHelper)
        {
            _layoutHelper = layoutHelper;
            _loginHelper = loginHelper;
            _registerHelper = registerHelper;
        }
        /// <summary>
        /// This method handles GET requests to the login page.
        /// If the user is already authenticated, they are redirected to the "MyAccount" page.
        /// Otherwise, it retrieves the layout based on the language code and returns the login view.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Index(string? returnUrl)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "MyAccount");
            }
            LoginClientViewModel model = new LoginClientViewModel();
            model.ReturnUrl = returnUrl;
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Login);
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(LoginClientViewModel model)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Login);
            if (!ModelState.IsValid)
            {
                return View();
            }
            var result = await _loginHelper.LoginAsync(model);
            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(model.ReturnUrl))
                {
                    return Redirect(model.ReturnUrl);
                }
                return RedirectToAction("Index", "MyAccount");
            }
            if (result.IsLockedOut)
            {
                ModelState.AddModelError("", "Your account is locked out.");
                return View();
            }
            ModelState.AddModelError("", "Your username or password is invalid");
            return View();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _loginHelper.LogoutAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> RecoverPassword()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.RecoverPassword);
            return View();
        }
        /// <summary>
        /// Step 1: check phonenumber and send security code
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RecoverPassword(RecoverPasswordClientViewModel model)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.RecoverPassword);
            // Check if the phone is already registered
            bool checkPhoneNumber = await _registerHelper.CheckPhoneNumberAsync(model.PhoneNumber);
            if (!ModelState.IsValid || !checkPhoneNumber)
            {
                if (!checkPhoneNumber)
                    ModelState.AddModelError("", "Phone number is not registered");
                return View(model);
            }
            //send security code to the user
            //bool result = await _loginHelper.SendSecurityCodeAsync(model);
            //if (!result)
            //{
            //    ModelState.AddModelError("", "Send security code failed");
            //    return View(model);
            //}
            var result = await _loginHelper.SendSecurityCodeAsync(model);
            TempData["OTP"] = result.Message;
            TempData["PhoneNumber"] = model.PhoneNumber;
            return RedirectToAction("VerifyCode");
        }

        [HttpGet]
        public async Task<IActionResult> VerifyCode()
        {
            string phoneNumber = TempData["PhoneNumber"].ToString();
            if (string.IsNullOrEmpty(phoneNumber))
                return RedirectToAction("RecoverPassword");
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.VerifyCode);
            SecurityCodeClientViewModel model = new SecurityCodeClientViewModel() { PhoneNumber = phoneNumber };
            return View(model);
        }
        /// <summary>
        /// Step 2: verify security code
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyCode(SecurityCodeClientViewModel model)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.VerifyCode);
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = await _loginHelper.VerifyCodeAsync(model);
            if (!result.OK)
            {
                ModelState.AddModelError("", "Your opt is invalid!");
                return View(model);
            }
            TempData["PhoneNumber"] = model.PhoneNumber;
            TempData["Token"] = result.Data;
            return RedirectToAction("ResetPassword");
        }

        [HttpGet]
        public async Task<IActionResult> ResetPassword()
        {
            string phoneNumber = TempData["PhoneNumber"].ToString();
            string token = TempData["Token"].ToString();
            //if access from url, the tempdata will be null.
            //conclude => Invalid access!
            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(token))
                return RedirectToAction("Index");
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.ResetPassword);
            ResetPasswordClientViewModel model = new ResetPasswordClientViewModel()
            {
                PhoneNumber = phoneNumber,
                Token = token
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordClientViewModel model)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.ResetPassword);
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            bool result = await _loginHelper.ResetPasswordAsync(model);
            if (!result)
            {
                ModelState.AddModelError("", "Something is wrong!");
                return View(model);
            }
            var login = await _loginHelper.LoginAsync(new LoginClientViewModel() { PhoneNumber = model.PhoneNumber, Password = model.Password });
            if (login.Succeeded)
            {
                return RedirectToAction("Index", "MyAccount");
            }
            ModelState.AddModelError("", "Something is wrong!");
            return View(model);
        }

    }
}
