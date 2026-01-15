using ChatBot.IHelpers;
using ChatBot.Models;
using Common;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class OllamaController : BaseApiController
    {
        private readonly IOllamaHelper _ollamaHelper;
        private readonly ILogger<OllamaController> _logger;

        public OllamaController(IOllamaHelper ollamaHelper, ILogger<OllamaController> logger)
        {
            _ollamaHelper = ollamaHelper;
            _logger = logger;
        }

        [HttpPost("completeChat")]
        public async Task<IActionResult> CompleteChat([FromBody] RequestModel model)
        {
            //https://www.nuget.org/packages/OpenAI/
            if (!ModelState.IsValid)
            {
                return Failed(EStatusCodes.BadRequest, "Failed");
            }
            var result = await _ollamaHelper.CompleteChatAsync(model);
            return Succeeded(result, "Successded");
        }

        [HttpPost("completeChatStreaming")]
        public async Task<IActionResult> CompleteChatStreaming([FromBody] RequestModel request)
        {

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for CompleteChatStreaming request");

                return BadRequest(request);
            }

            var response = await _ollamaHelper.CompleteChatStreamingAsync(request);

            return Ok(response);

        }

        [HttpGet("getModels")]
        public async Task<IActionResult> GetModels()
        {
            var models = await _ollamaHelper.GetModelsAsync();
            if(models == null || models.Count == 0)
            {
                return Failed(EStatusCodes.NotFound, "No models found");
            }
            return Succeeded(models, "Models retrieved successfully");
        }
    }
}
