using Common;
using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Helpers;
using MemberBusinessLogic.IHelpers;
using Microsoft.AspNetCore.Mvc;

namespace Lipstick.Controllers
{
    public class RegisterController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        private readonly IRegisterHelper _registerHelper;
        public RegisterController(LayoutHelper layoutHelper, IRegisterHelper registerHelper)
        {
            _layoutHelper = layoutHelper;
            _registerHelper = registerHelper;
        }
        /// <summary>
        /// Register Page
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Register);
            return View();
        }
        /// <summary>
        /// Handles the registration process.
        /// If registration is successful, the user is automatically logged in and redirected to the "My Account" page.
        /// If registration fails, the user is returned to the registration page with appropriate error messages.
        /// </summary>
        /// <param name="model">The registration details provided by the user.</param>
        /// <returns>A view of the registration page or a redirection to the "My Account" page.</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(RegisterClientViewModel model)
        {
            bool checkPhoneNumber = false;
            bool checkEmail = false;
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Register);
            //Check conditions
            checkPhoneNumber = await _registerHelper.CheckPhoneNumberAsync(model.PhoneNumber);
            if (!string.IsNullOrEmpty(model.Email))
                checkEmail = await _registerHelper.CheckEmailAsync(model.Email);
            //if model is invalid
            if (!ModelState.IsValid || checkPhoneNumber || checkEmail)
            {
                if (checkPhoneNumber)
                {
                    ModelState.AddModelError("PhoneNumber", "So dien thoai nay da ton tai");
                }
                if (checkEmail)
                {
                    ModelState.AddModelError("Email", "Email nay da ton tai");
                }
                return View(model);
            }
            //register a account
            bool result = await _registerHelper.RegisterAsync(model);
            //sucessfull register
            if (result)
                return RedirectToAction("Index", "MyAccount");
            //failed register
            return View(model);
        }
    }
}
