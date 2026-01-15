using Common.Models;

namespace ChatBot.IHelpers
{
    public interface IBeeBotHelper
    {
        public Task<ChatModel> SendMessage(ChatModel model);
        public Task<ChatModel> SendMessageWithFunctionCalling(ChatModel model);
        public Task<byte[]> TextToSpeech(string text);
        public Task<byte[]> TextToSpeechV1(string text);
        public Task<byte[]> BeeBot(ChatModel model);

    }
}
