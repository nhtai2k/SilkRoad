using ChatBot.IHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class PromptController : BaseApiController
    {
        private readonly IPromptHelper _promptHelper;

        public PromptController(IPromptHelper promptHelper)
        {
            _promptHelper = promptHelper;
        }

        [HttpGet("GetAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(EStatusCodes.BadRequest, "invalidPageIndex");
            var models = await _promptHelper.GetAllAsync(pageIndex, pageSize);
            if (models == null)
            {
                return Failed(EStatusCodes.NotFound, "No models found");
            }
            return Succeeded(models, "Models retrieved successfully");
        }

        [HttpGet("getOptionList")]
        public async Task<IActionResult> GetOptionList()
        {
            var options = await _promptHelper.GetOptionListAsync();
            if (options == null || options.Count == 0)
            {
                return Failed(EStatusCodes.NotFound, "No options found");
            }
            return Succeeded(options, "Options retrieved successfully");
        }
    }
}
