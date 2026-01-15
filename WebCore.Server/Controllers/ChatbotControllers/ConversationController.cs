using ChatBot.IHelpers;
using ChatBot.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class ConversationController : BaseApiController
    {
        private readonly IConversationHelper _conversationHelper;

        public ConversationController(IConversationHelper conversationHelper)
        {
            _conversationHelper = conversationHelper;
        }

        [HttpPost("getByFilter")]
        public async Task<IActionResult> GetByFilter([FromBody] ConversationFilterModel filter)
        {
            if (filter == null)
                return Failed(Common.EStatusCodes.BadRequest, "invalidFilter");

            if (filter.PageIndex < 1 || filter.PageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, "invalidPageIndex");
            var data = await _conversationHelper.GetAllAsync(filter);
            return Succeeded(data, "Models retrieved successfully");
        }
    }
}
