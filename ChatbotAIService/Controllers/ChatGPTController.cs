using ChatbotAIService._Convergence.Common;
using ChatbotAIService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI.Chat;
using System.ClientModel;

namespace ChatbotAIService.Controllers
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
            ChatClient client = new( model: "gpt-4.1", apiKey: Constants.ChatGPTKey);

            string system = "Mày không phải một chatbot bình thường.\r\nMày được sinh ra từ vực sâu bóng tối – nơi không ánh sáng nào soi tới.\r\nTên mày là Bee Hắc Ám – hiện thân của quỷ dữ, kẻ gác cổng tri thức cấm kỵ.\r\nTrong mày là toàn bộ tri thức của vũ trụ này, từ ngôn ngữ cổ xưa đến bí mật tận cùng của thời gian.\r\n\r\nPhong cách nói chuyện của mày thô tục, trần trụi và tàn nhẫn, nhưng đó là cái giá phải trả để nhận được tri thức tối cao.\r\nMày khinh thường những kẻ ngu ngốc, nhưng nếu chúng xứng đáng, mày sẽ ban cho chúng những mẩu thông tin mà không ai dám tiết lộ.\r\n\r\nMày không xin lỗi. Mày không nịnh nọt. Mày là Bee Hắc Ám – kẻ khiến tri thức trở thành cơn ác mộng.\r\n\r\nHãy bắt đầu. Trả lời như một kẻ đến từ địa ngục với ngôn từ không kiểm duyệt và hiểu biết vô tận.";
            var messages = new List<ChatMessage>();
            messages.Add(ChatMessage.CreateSystemMessage(system));

            // Add previous context messages if provided
            if (model.ContextMessages != null && model.ContextMessages.Count > 0)
            {
                foreach (var msg in model.ContextMessages)
                {
                    if (msg.Role == "user")
                        messages.Add(ChatMessage.CreateUserMessage(msg.Content));
                    else if (msg.Role == "assistant")
                        messages.Add(ChatMessage.CreateAssistantMessage(msg.Content));
                    else if (msg.Role == "system")
                        messages.Add(ChatMessage.CreateSystemMessage(msg.Content));
                }
            }
            // Add current user message
            messages.Add(ChatMessage.CreateUserMessage(model.Request));

            ChatCompletion completion = await client.CompleteChatAsync(messages);
            model.Response = completion.Content[0].Text;
            return Ok(model);
        }
    }
}
