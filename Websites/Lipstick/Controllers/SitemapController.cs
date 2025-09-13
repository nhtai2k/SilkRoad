using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Lipstick.Controllers
{
    public class SitemapController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SitemapController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            string sitemapPath = Path.Combine(_webHostEnvironment.WebRootPath, "sitemap.xml");
            string baseUrl = $"{Request.Scheme}://{Request.Host}";
            var controllers = new[] { "AboutUs", "Blog", "Brand", "Cart", "Contact", "ExchangeNReturn", "Home", "Login", "Payment", "PaymentPolicy", "Product" };

            var urls = controllers
                .Select(controller => Url.Action("Index", controller))
                .Where(url => !string.IsNullOrEmpty(url))
                .Select(url => $"{baseUrl}{url}")
                .ToList();

            var ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
            var today = DateTime.UtcNow.ToString("yyyy-MM-dd");

            var sitemap = new XDocument(
                new XDeclaration("1.0", "utf-8", "yes"),
                new XElement(XName.Get("urlset", ns),
                    urls.Select(url =>
                        new XElement(XName.Get("url", ns),
                            new XElement(XName.Get("loc", ns), url),
                            new XElement(XName.Get("lastmod", ns), today),
                            new XElement(XName.Get("changefreq", ns), "weekly"),
                            new XElement(XName.Get("priority", ns), "0.8")
                        )
                    )
                )
            );

            sitemap.Save(sitemapPath);
            return PhysicalFile(sitemapPath, "application/xml");
        }
    }
}
