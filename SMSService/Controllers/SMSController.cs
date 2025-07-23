using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SMSService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SMSController : ControllerBase
    {
        [HttpGet("")]
        public async Task<IActionResult> SendSMS()
        {
            // Simulate sending an SMS
            await Task.Delay(1000); // Simulate some delay
            // Return a success response
            return Ok(new { message = "SMS sent successfully!" });
        }
    }
}
