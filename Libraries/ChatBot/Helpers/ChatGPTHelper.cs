using ChatBot.IHelpers;
using ChatBot.IServices;
using ChatBot.Models;
using Common;
using OpenAI.Chat;

namespace ChatBot.Helpers
{
    public class ChatGPTHelper : IChatGPTHelper
    {
        private readonly IPromptHelper _promptHelper;
        private readonly IMessageService _messageService;
        private readonly IConversationService _conversationHelper;

        public ChatGPTHelper(IPromptHelper promptHelper, IMessageService messageService, IConversationService conversationHelper)
        {
            _promptHelper = promptHelper;
            _messageService = messageService;
            _conversationHelper = conversationHelper;
        }
        public async Task<ResponseModel> CompleteChatAsync(RequestModel model)
        {
            ResponseModel result = new ResponseModel();
            ChatClient client = new(model: "gpt-4", apiKey: Constants.ChatGPTKey);
            var mod = await _promptHelper.GetByIdAsync(model.PromptId);
            if (mod == null)
            {
                throw new Exception("Mod isn't allow null");
            }
            var messages = new List<ChatMessage>();
            messages.Add(ChatMessage.CreateSystemMessage(mod.Prompt));

            //If the conversation is new , I will create a new conversation
            if (!model.ConversationId.HasValue)
            {
                ConversationModel conversation = new ConversationModel()
                {
                    Source = "ChatGPT"
                };
                await _conversationHelper.CreateAsync(conversation);
                model.ConversationId = conversation.Id;
            }
            else// if not, I will get the old context
            {
                IEnumerable<MessageModel> oldMessages = await _messageService.GetMessagesAsync(model.ConversationId.Value);
                // if (temp != null)
                //     model.ContextMessages = temp.Select(x => new ContextMessage
                //     {
                //         Role = x.Sender,
                //         Content = x.Message
                //     }).ToList();
                // Add previous context messages if provided
                if (oldMessages != null && oldMessages.Any())
                {
                    foreach (var msg in oldMessages)
                    {
                        if (msg.Sender == "User")
                            messages.Add(ChatMessage.CreateUserMessage(msg.Message));
                        else
                            messages.Add(ChatMessage.CreateAssistantMessage(msg.Message));
                    }
                }
            }

            // Save user message
            MessageModel userMessage = new MessageModel()
            {
                Model = model.Model,
                PromptId = model.PromptId,
                ConversationId = model.ConversationId.Value,
                Sender = "User",
                Message = model.Message
            };
            await _messageService.CreateAsync(userMessage);

            // Add current user message
            messages.Add(ChatMessage.CreateUserMessage(model.Message));

            // Create options with default temperature for models that don't support custom temperature
            ChatCompletionOptions options = new()
            {
                Temperature = 1.0f // Use default temperature to avoid unsupported parameter error
            };

            ChatCompletion completion = await client.CompleteChatAsync(messages, options);
            result.Response = completion.Content[0].Text;

            // Save bot message
            if (!string.IsNullOrEmpty(result.Response))
            {
                result.ConversationId = model.ConversationId.Value;
                MessageModel chatGPTMessage = new MessageModel()
                {
                    Model = model.Model,
                    PromptId = model.PromptId,
                    ConversationId = model.ConversationId.Value,
                    Sender = model.Model,
                    Message = result.Response
                };
                await _messageService.CreateAsync(chatGPTMessage);
            }
            else
            {
                result.Response = "No response generated";
            }
            return result;
        }

        public List<string> GetModels()
        {
            // For now, return a predefined list of commonly available GPT models
            // This avoids API calls and potential issues with model listing
            var availableModels = new List<string>
            {
                "gpt-4",
                "gpt-4-0314",
                "gpt-4-0613",
                "gpt-4-32k",
                "gpt-4-32k-0314",
                "gpt-4-32k-0613",
                "gpt-4-turbo",
                "gpt-4-turbo-preview",
                "gpt-4o",
                "gpt-4o-mini",
                "gpt-3.5-turbo",
                "gpt-3.5-turbo-0301",
                "gpt-3.5-turbo-0613",
                "gpt-3.5-turbo-16k",
                "gpt-3.5-turbo-16k-0613"
            };

            return availableModels;
        }
    }
}
