using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class CategoryClientController : ControllerBase
    {
        private readonly ICategoryClientHelper _categoryHelper;

        public CategoryClientController(ICategoryClientHelper categoryHelper)
        {
            _categoryHelper = categoryHelper;
        }
        [HttpGet("getNavigationBar")]
        public IActionResult GetNavigationBar()
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _categoryHelper.GetNavigationBar(language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
        [HttpGet("getMenu")]
        public IActionResult GetMenu()
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _categoryHelper.GetMenu(language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
    }
}
