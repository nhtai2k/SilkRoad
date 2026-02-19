using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Microsoft.AspNetCore.Mvc;
using System.Share;

namespace Lipstick.Controllers
{
    public class ExchangeNReturnController : Controller
    {
        private readonly InformationPageService _informationPageService;
        private readonly LayoutHelper _layoutHelper;
        public ExchangeNReturnController(InformationPageService informationPageService, LayoutHelper layoutHelper)
        {
            _informationPageService = informationPageService;
            _layoutHelper = layoutHelper;
        }
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.ExchangeNReturnPolicy);
            var data = await _informationPageService.GetInforPageByPageTypeId(languageCode, (int)EPageTypes.ExchangeNReturnPolicy);
            return View(data);
        }
    }
}
