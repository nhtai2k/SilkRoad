using Common;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lipstick.Controllers
{
    public class PaymentPolicyController : Controller
    {
        private readonly InformationPageService _informationPageService;
        private readonly LayoutHelper _layoutHelper;
        public PaymentPolicyController(InformationPageService informationPageService, LayoutHelper layoutHelper)
        {
            _informationPageService = informationPageService;
            _layoutHelper = layoutHelper;
        }
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.PaymentPolicy);
            var data = await _informationPageService.GetInforPageByPageTypeId(languageCode, (int)EPageTypes.PaymentPolicy);
            return View(data);
        }
    }
}
