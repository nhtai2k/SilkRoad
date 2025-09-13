using Microsoft.AspNetCore.Mvc;

namespace Lipstick.Controllers
{
    public class VOCController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
