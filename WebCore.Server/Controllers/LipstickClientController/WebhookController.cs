using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share.Models;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
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
            if (model == null)
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
