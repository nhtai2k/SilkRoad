using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class InforPageClientController : ControllerBase
    {
        private readonly IInforPageClientHelper _inforPageClientHelper;
        public InforPageClientController(IInforPageClientHelper inforPageClientHelper)
        {
            _inforPageClientHelper = inforPageClientHelper;
        }
        [HttpGet]
        [Route("getByPageTypeId/{pageTypeId}")]
        public IActionResult GetByPageTypeId(int pageTypeId)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = _inforPageClientHelper.GetFirstDataByPageTypeId(pageTypeId, language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
    }
}
