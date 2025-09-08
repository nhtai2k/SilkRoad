using Common.Custom.ApiKey;
using Common.Models;
using LipstickBusinessLogic.ILipstickClientHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/[controller]")]
    [ApiController]
    //[ApiKey]
    public class WebhookController : ControllerBase
    {
        private readonly IWebhookHelper _webhookHelper;
        public WebhookController(IWebhookHelper webhookHelper)
        {
            _webhookHelper = webhookHelper;
        }
        [HttpPost("ReceiveNotification")]
        public async Task<IActionResult> ReceiveNotification([FromBody] SepayModel model)
        {
            if(model == null)
            {
                return BadRequest("Invalid model");
            }
            bool result = await _webhookHelper.CreateAsync(model);
            if (!result)
            {
                return BadRequest("Failed to create notification");
            }
            return Ok("Notification received successfully");
        }
    }
}
