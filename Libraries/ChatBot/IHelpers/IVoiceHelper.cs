namespace ChatBot.IHelpers
{
    public interface IVoiceHelper
    {
        public Task<byte[]> GetVoiceFromElevenlabsAsync(string text);
        public Task<byte[]> GetVoiceFromChatGPTAsync(string text);

    }
}
