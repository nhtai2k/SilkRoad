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

            ChatCompletion completion = client.CompleteChat(model.Request);

            model.Response = completion.Content[0].Text;
            //AsyncCollectionResult<StreamingChatCompletionUpdate> completionUpdates = client.CompleteChatStreamingAsync("Say 'this is a test.'");

            //Console.Write($"[ASSISTANT]: ");
            //await foreach (StreamingChatCompletionUpdate completionUpdate in completionUpdates)
            //{
            //    if (completionUpdate.ContentUpdate.Count > 0)
            //    {
            //        Console.Write(completionUpdate.ContentUpdate[0].Text);
            //    }
            //}

            return Ok(model);
        }
    }
}
