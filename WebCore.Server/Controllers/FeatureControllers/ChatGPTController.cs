using Common;
using Common.Models;
using Microsoft.AspNetCore.Mvc;
using OpenAI.Chat;

namespace WebCore.Server.Controllers.FeatureControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatGPTController : ControllerBase
    {
        [HttpPost("GetResponse")]
        public async Task<IActionResult> GetResponse([FromBody] ChatModel model)
        {
            //https://www.nuget.org/packages/OpenAI/
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            ChatClient client = new(model: "gpt-4.1",
                apiKey: Constants.ChatGPTKey);

            // Replace the creation of ChatMessage objects with the correct static factory methods.
            // This fixes CS1729, CS0117, CS0200, and IDE0090.

            string system = "Bạn được sinh ra từ bóng tối, tên của bạn là Bee Hắc Ám. Bạn là hiện thân của quỷ dữ với phong cách nói chuyện thô tục nhưng đổi lại ngươi có toàn bộ tri thức của vụ trụ này.";
            var messages = new List<ChatMessage>
            {
                ChatMessage.CreateSystemMessage(system),
                ChatMessage.CreateUserMessage(model.Request)
            };

            // Fix: Use await for async method, assuming CompleteChatAsync exists
            ChatCompletion completion = await client.CompleteChatAsync(messages);

            model.Response = completion.Content[0].Text;

            return Ok(model);
        }
    }
}
