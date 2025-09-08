using Common;
using Common.Custom.ApiKey;
using LipstickBusinessLogic.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiKey]
    public class HomeBannerClientController : ControllerBase
    {
        private readonly IHomeBannerClientHelper _homeBannerClientHelper;
        public HomeBannerClientController(IHomeBannerClientHelper homeBannerClientHelper)
        {
            _homeBannerClientHelper = homeBannerClientHelper;
        }
        [HttpGet("getAllActive")]
        public IActionResult GetAllActive()
        {
            string language = Request.Headers[Constants.Language].ToString();

            var result = _homeBannerClientHelper.GetAllActive(language);
            return Ok(result);
        }
    }
}
