using Lipstick._Convergence.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.Controllers
{
    public class ContactController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        public ContactController(LayoutHelper layoutHelper)
        {
            _layoutHelper = layoutHelper;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Contact);
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(FeedbackClientViewModel model)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            if (ModelState.IsValid)
            {
                // Send email
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}
