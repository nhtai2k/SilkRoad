using ChatBot.Models;

namespace ChatBot.IHelpers
{
    public interface IOllamaHelper
    {
        // Task<ChatResponseDto> GenerateResponseAsync(ChatRequestDto request);
        // Task<ChatResponseDto> GenerateStreamingResponseAsync(ChatRequestDto request);
        Task<ResponseModel> CompleteChatAsync(RequestModel model);

        Task<ResponseModel> CompleteChatStreamingAsync(RequestModel model);

        Task<List<string>> GetModelsAsync();

    }
}
