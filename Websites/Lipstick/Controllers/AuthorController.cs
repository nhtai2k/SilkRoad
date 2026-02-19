using Lipstick._Convergence.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;

namespace Lipstick.Controllers
{
    public class AuthorController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        public AuthorController(LayoutHelper layoutHelper)
        {
            _layoutHelper = layoutHelper;
        }
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            return View();
        }
    }
}
