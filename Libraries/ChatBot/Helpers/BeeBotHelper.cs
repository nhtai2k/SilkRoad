using ChatBot.IHelpers;
using Microsoft.AspNetCore.Hosting;
using OpenAI.Audio;
using OpenAI.Chat;
using System.Share;
using System.Share.Models;
using System.Text.Json;

namespace ChatBot.Helpers
{
    public class BeeBotHelper : IBeeBotHelper
    {
        private readonly IPromptHelper _promptHelper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public BeeBotHelper(IPromptHelper promptHelper, IWebHostEnvironment hostEnvironment)
        {
            _promptHelper = promptHelper;
            _hostEnvironment = hostEnvironment;
        }
        public async Task<ChatModel> SendMessage(ChatModel model)
        {
            ChatClient client = new(model: "gpt-4", apiKey: Constants.ChatGPTKey);
            var mod = await _promptHelper.GetByIdAsync(model.Mod);
            if (mod == null)
            {
                throw new Exception("Mod isn't allow null");
            }
            var messages = new List<ChatMessage>();
            messages.Add(ChatMessage.CreateSystemMessage(mod.Prompt));

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

            // Create options with default temperature for models that don't support custom temperature
            ChatCompletionOptions options = new()
            {
                Temperature = 1.0f // Use default temperature to avoid unsupported parameter error
            };

            ChatCompletion completion = await client.CompleteChatAsync(messages, options);
            model.Response = completion.Content[0].Text;

            return model;
        }

        /// <summary>
        /// Enhanced SendMessage method with function calling support
        /// This demonstrates how to integrate function calling into your existing chatbot
        /// </summary>
        public async Task<ChatModel> SendMessageWithFunctionCalling(ChatModel model)
        {
            ChatClient client = new(model: "gpt-4", apiKey: Constants.ChatGPTKey);
            var mod = await _promptHelper.GetByIdAsync(model.Mod);
            if (mod == null)
            {
                throw new Exception("Mod isn't allow null");
            }

            var messages = new List<ChatMessage>();
            messages.Add(ChatMessage.CreateSystemMessage(mod.Prompt));

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

            // Create tools from FunctionCalling class
            var tools = FunctionCalling.GetAvailableTools();

            ChatCompletionOptions options = new();
            foreach (var tool in tools)
            {
                options.Tools.Add(tool);
            }

            // Handle function calling loop
            bool requiresAction;
            string finalResponse = "";

            do
            {
                requiresAction = false;
                ChatCompletion completion = await client.CompleteChatAsync(messages, options);

                switch (completion.FinishReason)
                {
                    case ChatFinishReason.Stop:
                        {
                            messages.Add(ChatMessage.CreateAssistantMessage(completion.Content[0].Text));
                            finalResponse = completion.Content[0].Text;
                            break;
                        }

                    case ChatFinishReason.ToolCalls:
                        {
                            // Add the assistant message with tool calls to the conversation history
                            messages.Add(ChatMessage.CreateAssistantMessage(completion));

                            // Process each tool call
                            foreach (ChatToolCall toolCall in completion.ToolCalls)
                            {
                                string toolResult = await FunctionCalling.ExecuteFunction(toolCall);
                                messages.Add(ChatMessage.CreateToolMessage(toolCall.Id, toolResult));
                            }

                            requiresAction = true;
                            break;
                        }

                    case ChatFinishReason.Length:
                        throw new NotImplementedException("Incomplete model output due to MaxTokens parameter or token limit exceeded.");

                    case ChatFinishReason.ContentFilter:
                        throw new NotImplementedException("Omitted content due to a content filter flag.");

                    default:
                        throw new NotImplementedException(completion.FinishReason.ToString());
                }
            } while (requiresAction);

            model.Response = finalResponse;
            return model;
        }


        public async Task<byte[]> TextToSpeech(string text)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(text))
                {
                    throw new ArgumentException("Text cannot be null or empty.", nameof(text));
                }
                // Create audio client using the same API key as chat
                AudioClient client = new("tts-1", Constants.ChatGPTKey);
                // string instructions = 
                //                     @"Tone: Cheerful, playful, and friendly, with a touch of cuteness and innocence.
                //                     Emotion: Warmth and positivity, sprinkled with curiosity and lighthearted energy.
                //                     Delivery: Bright and lively, slightly faster than normal, with gentle giggles, soft exclamations (""yaa~"", ""hihi"", ""aww""), and occasional drawn-out words to emphasize excitement (""sooo fun!"", ""cuuuteee~"").";
                // Generate speech from text
                var response = await client.GenerateSpeechAsync(text, GeneratedSpeechVoice.Nova);

                // Get the audio data as bytes
                var audioBytes = response.Value.ToArray();

                return audioBytes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error generating speech: {ex.Message}", ex);
            }
        }

        public async Task<byte[]> BeeBot(ChatModel model)
        {
            ChatClient client = new(model: "gpt-4", apiKey: Constants.ChatGPTKey);
            var mod = await _promptHelper.GetByIdAsync(model.Mod);
            if (mod == null)
            {
                throw new Exception("Mod isn't allow null");
            }
            var messages = new List<ChatMessage>();
            messages.Add(ChatMessage.CreateSystemMessage(mod.Prompt));

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

            // Create options with default temperature for models that don't support custom temperature
            ChatCompletionOptions options = new()
            {
                Temperature = 1.0f // Use default temperature to avoid unsupported parameter error
            };

            ChatCompletion completion = await client.CompleteChatAsync(messages, options);
            string responseText = completion.Content[0].Text;

            // Create audio client using the same API key as chat
            AudioClient audioClient = new("tts-1", Constants.ChatGPTKey);

            // Generate speech from text
            var response = await audioClient.GenerateSpeechAsync(responseText, GeneratedSpeechVoice.Alloy);

            // Get the audio data as bytes
            var audioBytes = response.Value.ToArray();

            // If file path is provided, save the audio to file
            // string filePath = Path.Combine(_hostEnvironment.WebRootPath, "audio", "speed.mp3");
            // await File.WriteAllBytesAsync(filePath, audioBytes);

            return audioBytes;
        }

        public async Task<byte[]> TextToSpeechV1(string text)
        {
            try
            {
                // Create speech (POST /v1/text-to-speech/:voice_id) using HttpClient in C#
                using var httpClient = new HttpClient();
                var requestUrl = "https://api.elevenlabs.io/v1/text-to-speech/R5gMQAqFtnaPweI0PDWi?output_format=mp3_44100_128";
                httpClient.DefaultRequestHeaders.Add("xi-api-key", Constants.TextToSpeechKey);
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                var payload = new
                {
                    text,
                    voice_settings = new
                    {
                        stability = 0.8,
                        speed = 1,
                        similarity_boost = 0.4
                    },
                    model_id = "eleven_turbo_v2_5",
                    language_code = "vi"
                };

                var content = new StringContent(JsonSerializer.Serialize(payload), System.Text.Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(requestUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"Failed to generate speech: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
                }

                var responseBytes = await response.Content.ReadAsByteArrayAsync();
                return responseBytes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error generating speech: {ex.Message}", ex);
            }
        }
    }
}
