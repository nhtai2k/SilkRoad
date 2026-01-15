using ChatBot.IHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageHelper _messageHelper;

        public MessageController(IMessageHelper messageHelper)
        {
            _messageHelper = messageHelper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(Guid conversationId)
        {
            var messages = await _messageHelper.GetByConversationIdAsync(conversationId);
            return Ok(messages);
        }
    }
}
