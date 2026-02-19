using ChatBot.IHelpers;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class VoiceController : ControllerBase
    {
        private readonly IVoiceHelper _voiceHelper;

        public VoiceController(IVoiceHelper voiceHelper)
        {
            _voiceHelper = voiceHelper;
        }

        [HttpPost("getVoiceFromChatGPT")]
        public async Task<IActionResult> GetVoiceFromChatGPT([FromBody] string mess)
        {
            if (string.IsNullOrEmpty(mess))
            {
                return NotFound("Music file not found.");
            }
            var data = await _voiceHelper.GetVoiceFromChatGPTAsync(mess); // Ensure TTS is called if needed
            return File(data, "audio/mpeg", "music.mp3");
        }

        [HttpPost("getVoiceFromElevenlabs")]
        public async Task<IActionResult> GetVoiceFromElevenlabs([FromBody] string mess)
        {
            if (string.IsNullOrEmpty(mess))
            {
                return NotFound("Music file not found.");
            }
            var data = await _voiceHelper.GetVoiceFromElevenlabsAsync(mess); // Ensure TTS is called if needed
            return File(data, "audio/mpeg", "music.mp3");
        }
    }
}
