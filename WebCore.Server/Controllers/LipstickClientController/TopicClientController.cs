using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class TopicClientController : ControllerBase
    {
        private readonly ITopicClientHelper _topicClientHelper;
        public TopicClientController(ITopicClientHelper topicClientHelper)
        {
            _topicClientHelper = topicClientHelper;
        }
        [HttpGet("getTopicsInHomePage")]
        public IActionResult GetTopicsInHomePage()
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = _topicClientHelper.GetTopicsInHomePage(language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
        [HttpGet("getAllActive")]
        public IActionResult GetAllActive()
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _topicClientHelper.GetAllActive(language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
    }
}
