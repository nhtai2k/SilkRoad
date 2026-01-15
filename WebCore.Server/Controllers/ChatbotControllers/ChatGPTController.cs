using ChatBot.IHelpers;
using ChatBot.Models;
using Common;
using Microsoft.AspNetCore.Mvc;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class ChatGPTController : BaseApiController
    {
        private readonly IChatGPTHelper _chatGPTHelper;
        private readonly ILogger<ChatGPTController> _logger;

        public ChatGPTController(IChatGPTHelper chatGPTHelper, ILogger<ChatGPTController> logger)
        {
            _chatGPTHelper = chatGPTHelper;
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
            var result = await _chatGPTHelper.CompleteChatAsync(model);
            return Succeeded(result,"Successded");
        }

        [HttpGet("getModels")]
        public IActionResult GetModels()
        {
            var models =  _chatGPTHelper.GetModels();
            if(models == null || models.Count == 0)
            {
                return Failed(EStatusCodes.NotFound, "No models found");
            }
            return Succeeded(models, "Models retrieved successfully");
        }
    
    }
}
