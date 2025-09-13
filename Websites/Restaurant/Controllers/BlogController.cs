using Microsoft.AspNetCore.Mvc;

namespace Restaurant.Controllers
{
    public class BlogController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
