using Common;
using Lipstick._Convergence.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Lipstick.Controllers
{
    public class NotFoundController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        public NotFoundController(LayoutHelper layoutHelper)
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
