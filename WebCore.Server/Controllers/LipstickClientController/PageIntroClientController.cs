using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class PageIntroClientController : ControllerBase
    {
        private readonly IPageIntroClientHelper _pageIntroClientHelper;
        public PageIntroClientController(IPageIntroClientHelper pageIntroClientHelper)
        {
            _pageIntroClientHelper = pageIntroClientHelper;
        }
        [HttpGet("GetByPageTypeId/{pageTypeId}")]
        public IActionResult GetByPageTypeId(int pageTypeId)
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _pageIntroClientHelper.GetPageIntroClientByPageTypeId(language, pageTypeId);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
    }
}
