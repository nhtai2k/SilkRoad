using ChatBot.Hubs;
using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Models;
using Microsoft.AspNetCore.SignalR;
using Ollama;

namespace ChatBot.Helpers
{
    public class OllamaHelper : IOllamaHelper
    {
        private readonly IHubContext<ChatHub> _chatHub;
        private readonly IMessageService _messageService;
        private readonly IPromptHelper _promptHelper;
        private readonly IConversationService _conversationHelper;

        public OllamaHelper(IHubContext<ChatHub> chatHub,
            IPromptHelper promptHelper,
            IMessageService messageService,
            IConversationService conversationHelper)
        {
            _chatHub = chatHub;
            _messageService = messageService;
            _promptHelper = promptHelper;
            _conversationHelper = conversationHelper;
        }

        public async Task<ResponseModel> CompleteChatAsync(RequestModel request)
        {
            try
            {

                ResponseModel result = new ResponseModel();
                using var ollama = new OllamaApiClient();
                IList<long>? Context = null;

                //Get system prompt by id
                var mod = await _promptHelper.GetByIdAsync(request.PromptId);
                if (mod == null)
                    throw new Exception("Can't get the system prompt");

                //If the conversation is new , I will create a new conversation
                if (!request.ConversationId.HasValue)
                {
                    ConversationModel conversation = new ConversationModel()
                    {
                        Source = "Ollama"
                    };
                    await _conversationHelper.CreateAsync(conversation);
                    request.ConversationId = conversation.Id;
                }
                else// if not, I will get the old context
                {
                    var temp = await _messageService.GetLastMessageAsync(request.ConversationId.Value);
                    if (temp != null)
                        Context = temp.Context;
                }

                // Save user message
                MessageModel userMessage = new MessageModel()
                {
                    Model = request.Model,
                    PromptId = request.PromptId,
                    ConversationId = request.ConversationId.Value,
                    Sender = "User",
                    Message = request.Message
                };
                await _messageService.CreateAsync(userMessage);

                var completionResult = await ollama.Completions
                    .GenerateCompletionAsync(request.Model, request.Message, stream: false, context: Context, system: mod.Prompt)
                    .WaitAsync();

                // Save bot message
                if (!string.IsNullOrEmpty(completionResult.Response))
                {
                    result.ConversationId = request.ConversationId.Value;
                    result.Response = completionResult.Response;
                    MessageModel ollamaMessage = new MessageModel()
                    {
                        Model = request.Model,
                        PromptId = request.PromptId,
                        ConversationId = request.ConversationId.Value,
                        Sender = request.Model,
                        Message = completionResult.Response,
                        Context = completionResult.Context
                    };
                    await _messageService.CreateAsync(ollamaMessage);
                }
                else
                {
                    result.Response = "No response generated";
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CompleteChatAsync: {ex.Message}", ex);
            }
        }

        public async Task<ResponseModel> CompleteChatStreamingAsync(RequestModel request)
        {

            ResponseModel result = new ResponseModel();


            using var ollama = new OllamaApiClient();

            // Initialize context if needed
            // if (request.Context == null || request.Context.Count == 0)
            // {
            //     request.Context = await InitializeContextAsync(ollama, response.Model);
            // }
            string model = "llama3";
            IList<long>? Context = null;
            var enumerable = ollama.Completions.GenerateCompletionAsync(
                model,
                request.Message,
                context: Context);

            var fullResponse = string.Empty;
            await foreach (var streamResponse in enumerable)
            {
                fullResponse += streamResponse.Response;
                await _chatHub.Clients.All.SendAsync("ReceiveMessage", streamResponse.Response, streamResponse.Context);
                Context = streamResponse.Context;
            }

            result.Response = fullResponse;

            return result;
        }

        public async Task<List<string>> GetModelsAsync()
        {
            using var client = new OllamaApiClient();
            var models = await client.Models.ListModelsAsync();

            // Fix for CS8604: Ensure 'models.Models' is not null before calling 'Select'
            if (models.Models == null)
            {
                return new List<string>();
            }

            // Fix for CS8619: Use null-coalescing operator to ensure no null values in the resulting list
            return models.Models.Select(m => m.Model1 ?? string.Empty).ToList();
        }
    }
}
