using ChatbotAIService._Convergence.Common;
using ChatbotAIService._Convergence.Services;
using ChatbotAIService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI.Chat;

namespace ChatbotAIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeebotController : ControllerBase
    {
        private readonly BeeService _beeService;
        public BeebotController(BeeService beeService)
        {
            _beeService = beeService;
            // Constructor logic if needed
        }

        [HttpPost("GetResponse")]
        public async Task<IActionResult> GetResponse([FromBody] BeeModoel model)
        {
            //https://www.nuget.org/packages/OpenAI/
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
           var result = await _beeService.ChatBee(model);
            return Ok(result);
        }
        [HttpGet("GetMods")]
        public IActionResult GetBeeConfig(int id)
        {
            var config = _beeService.GetBeeConfig(id);
            if (config == null)
            {
                return NotFound($"Bee config with ID {id} not found.");
            }
            return Ok(config);
        }
    }
}
