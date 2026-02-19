using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class BrandClientController : ControllerBase
    {
        private readonly IBrandClientHelper _brandHelper;
        public BrandClientController(IBrandClientHelper brandHelper)
        {
            _brandHelper = brandHelper;
        }
        [HttpGet("getAllActive")]
        public IActionResult GetAllActive()
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = _brandHelper.GetAllActive(language);
            return Ok(data);
        }
    }
}
