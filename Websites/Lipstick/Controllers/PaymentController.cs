using Lipstick._Convergence.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;

namespace Lipstick.Controllers
{
    public class PaymentController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        private readonly ClientAppConfig _appConfig;
        public PaymentController(LayoutHelper layoutHelper, ClientAppConfig appConfig)
        {
            _layoutHelper = layoutHelper;
            _appConfig = appConfig;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetQRBanking(string amount, string mess)
        {
            string url = _appConfig.QRBankingUrl.Replace("#amount#", amount).Replace("#message#", mess);
            using (var httpClient = new HttpClient())
            {
                // Fetch the image from the external server
                var response = await httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    return BadRequest();
                }

                // Read the image content
                var content = await response.Content.ReadAsByteArrayAsync();
                var contentType = response.Content.Headers.ContentType.ToString();

                // Return the image as a FileResult
                return File(content, contentType);
            }
        }
    }
}
