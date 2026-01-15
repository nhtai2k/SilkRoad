using ChatBot.Models;

namespace ChatBot.IHelpers
{
    public interface IChatGPTHelper
    {
        Task<ResponseModel> CompleteChatAsync(RequestModel model);
        List<string> GetModels();

    }
}
