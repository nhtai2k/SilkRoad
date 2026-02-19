using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Microsoft.AspNetCore.Mvc;
using System.Share;

namespace Lipstick.Controllers
{
    public class BrandController : Controller
    {
        private readonly BrandService _brandService;
        private readonly LayoutHelper _layoutHelper;
        public BrandController(BrandService brandService, LayoutHelper layoutHelper)
        {
            _brandService = brandService;
            _layoutHelper = layoutHelper;
        }
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Brand);
            var data = await _brandService.GetAllActive(languageCode);
            return View(data);
        }
    }
}
