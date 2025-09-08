using Microsoft.AspNetCore.Mvc;

namespace Restaurant.Controllers
{
    public class AboutUsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
