using Common;
using Common.Models;
using Lipstick._Convergence.Helpers;
using Lipstick.ViewModels;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Lipstick.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly LayoutHelper _layoutHelper;
        private readonly HomePageHelper _homePageHelper;
        public HomeController(ILogger<HomeController> logger, LayoutHelper layoutHelper, HomePageHelper homePageHelper)
        {
            _logger = logger;
            _layoutHelper = layoutHelper;
            _homePageHelper = homePageHelper;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            var userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.HomePage);
            var data = await _homePageHelper.GetHomePageAsync(languageCode, userId);
            return View(data);
        }
        [HttpGet]
        public IActionResult SetLanguage()
        {
            string languageCode = Global.GetLanguageCode(Request);
            string vn = ELanguages.VN.ToString();
            if (string.Equals(languageCode, vn))
            {
                Response.Cookies.Append(
                    CookieRequestCultureProvider.DefaultCookieName,
                    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture("en-US")),
                    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
                );
            }
            else
            {
                Response.Cookies.Append(
                   CookieRequestCultureProvider.DefaultCookieName,
                   CookieRequestCultureProvider.MakeCookieValue(new RequestCulture("vi-VN")),
                   new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
               );
            }
            return Redirect(Request.Headers["Referer"].ToString());
        }
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        
        
        public async Task<IActionResult> Lost()
        {
            string languageCode = Global.GetLanguageCode(Request);
            var userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Default);
            return View();
        }
    }
}