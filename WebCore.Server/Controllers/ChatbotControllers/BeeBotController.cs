using ChatBot.IHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share.Models;

namespace WebCore.Server.Controllers.ChatbotControllers
{
    [Route("api/chatbot/[controller]")]
    [ApiController]
    public class BeeBotController : ControllerBase
    {
        private readonly IBeeBotHelper _beeBotHelper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BeeBotController(IBeeBotHelper beeBotHelper, IWebHostEnvironment webHostEnvironment)
        {
            _beeBotHelper = beeBotHelper;
            _webHostEnvironment = webHostEnvironment;
            // Constructor logic if needed
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> GetResponse([FromBody] ChatModel model)
        {
            //https://www.nuget.org/packages/OpenAI/
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            var result = await _beeBotHelper.SendMessageWithFunctionCalling(model);
            return Ok(result);
        }
        [HttpPost("getVoid")]
        public async Task<IActionResult> GetVoid([FromBody] string mess)
        {
            if (string.IsNullOrEmpty(mess))
            {
                return NotFound("Music file not found.");
            }
            var data = await _beeBotHelper.TextToSpeech(mess); // Ensure TTS is called if needed
            return File(data, "audio/mpeg", "music.mp3");
        }

        [HttpGet("getMusic")]
        public async Task<IActionResult> GetMusic()
        {
            //path to the music file
            string musicFilePath = Path.Combine(_webHostEnvironment.WebRootPath, "music", "music.mp3");
            // Check if the file exists
            if (!System.IO.File.Exists(musicFilePath))
            {
                return NotFound("Music file not found.");
            }
            var musicBytes = await System.IO.File.ReadAllBytesAsync(musicFilePath);
            return File(musicBytes, "audio/mpeg", "music.mp3");
        }

        // [HttpPost("beeBot")]
        // public async Task<IActionResult> BeetBot([FromBody] ChatModel model)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(model);
        //     }
        //     var result = await _beebotHelper.BeeBot(model);
        //     return File(result, "audio/mpeg", "speed.mp3");
        // }
    }
}
