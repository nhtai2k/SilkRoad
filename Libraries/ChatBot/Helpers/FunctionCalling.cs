using OpenAI.Chat;
using System.Text.Json;

namespace ChatBot.Helpers
{
    public static class FunctionCalling
    {
        private static string GetCurrentLocation()
        {
            // Call the location API here.
            return "Thành Phố Hồ Chí Minh, Quận 4";
        }

        private static string GetCurrentWeather(string location, string unit = "celsius")
        {
            // Call the weather API here.
            return $"31 {unit}";
        }

        private static readonly ChatTool getCurrentLocationTool = ChatTool.CreateFunctionTool(
            functionName: nameof(GetCurrentLocation),
            functionDescription: "Get the user's current location"
        );

        private static readonly ChatTool getCurrentWeatherTool = ChatTool.CreateFunctionTool(
            functionName: nameof(GetCurrentWeather),
            functionDescription: "Get the current weather in a given location",
            functionParameters: BinaryData.FromBytes("""
            {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. Boston, MA"
                    },
                    "unit": {
                        "type": "string",
                        "enum": [ "celsius", "fahrenheit" ],
                        "description": "The temperature unit to use. Infer this from the specified location."
                    }
                },
                "required": [ "location" ]
            }
            """u8.ToArray())
        );

        /// <summary>
        /// Get all available tools for function calling
        /// </summary>
        public static IList<ChatTool> GetAvailableTools()
        {
            return new List<ChatTool> { getCurrentLocationTool, getCurrentWeatherTool };
        }

        /// <summary>
        /// Execute a function based on the tool call
        /// </summary>
        public static async Task<string> ExecuteFunction(ChatToolCall toolCall)
        {
            return await Task.Run(() =>
            {
                switch (toolCall.FunctionName)
                {
                    case nameof(GetCurrentLocation):
                        return GetCurrentLocation();

                    case nameof(GetCurrentWeather):
                        using (JsonDocument argumentsJson = JsonDocument.Parse(toolCall.FunctionArguments))
                        {
                            bool hasLocation = argumentsJson.RootElement.TryGetProperty("location", out JsonElement location);
                            bool hasUnit = argumentsJson.RootElement.TryGetProperty("unit", out JsonElement unit);

                            if (!hasLocation)
                            {
                                throw new ArgumentNullException(nameof(location), "The location argument is required.");
                            }

                            return hasUnit
                                ? GetCurrentWeather(location.GetString() ?? "", unit.GetString() ?? "celsius")
                                : GetCurrentWeather(location.GetString() ?? "");
                        }

                    default:
                        throw new NotImplementedException($"Unknown function: {toolCall.FunctionName}");
                }
            });
        }

        /// <summary>
        /// Demo method showing how to use function calling with ChatGPT
        /// </summary>
        /// <param name="apiKey">Your OpenAI API key</param>
        /// <param name="userMessage">The user's message</param>
        /// <returns>The final response from the assistant</returns>
        public static async Task<string> DemoFunctionCalling(string apiKey, string userMessage = "What's the weather like today?")
        {
            ChatClient client = new(model: "gpt-4", apiKey: apiKey);

            List<ChatMessage> messages = new()
            {
                ChatMessage.CreateUserMessage(userMessage)
            };

            ChatCompletionOptions options = new()
            {
                Tools = { getCurrentLocationTool, getCurrentWeatherTool }
            };

            bool requiresAction;

            do
            {
                requiresAction = false;
                ChatCompletion completion = await client.CompleteChatAsync(messages, options);

                switch (completion.FinishReason)
                {
                    case ChatFinishReason.Stop:
                        {
                            // Add the assistant message to the conversation history.
                            messages.Add(ChatMessage.CreateAssistantMessage(completion.Content[0].Text));
                            return completion.Content[0].Text;
                        }

                    case ChatFinishReason.ToolCalls:
                        {
                            // First, add the assistant message with tool calls to the conversation history.
                            messages.Add(ChatMessage.CreateAssistantMessage(completion));

                            // Then, add a new tool message for each tool call that is resolved.
                            foreach (ChatToolCall toolCall in completion.ToolCalls)
                            {
                                switch (toolCall.FunctionName)
                                {
                                    case nameof(GetCurrentLocation):
                                        {
                                            string toolResult = GetCurrentLocation();
                                            messages.Add(ChatMessage.CreateToolMessage(toolCall.Id, toolResult));
                                            break;
                                        }

                                    case nameof(GetCurrentWeather):
                                        {
                                            // The arguments that the model wants to use to call the function are specified as a
                                            // stringified JSON object based on the schema defined in the tool definition. Note that
                                            // the model may hallucinate arguments too. Consequently, it is important to do the
                                            // appropriate parsing and validation before calling the function.
                                            using JsonDocument argumentsJson = JsonDocument.Parse(toolCall.FunctionArguments);
                                            bool hasLocation = argumentsJson.RootElement.TryGetProperty("location", out JsonElement location);
                                            bool hasUnit = argumentsJson.RootElement.TryGetProperty("unit", out JsonElement unit);

                                            if (!hasLocation)
                                            {
                                                throw new ArgumentNullException(nameof(location), "The location argument is required.");
                                            }

                                            string toolResult = hasUnit
                                                ? GetCurrentWeather(location.GetString() ?? "", unit.GetString() ?? "celsius")
                                                : GetCurrentWeather(location.GetString() ?? "");
                                            messages.Add(ChatMessage.CreateToolMessage(toolCall.Id, toolResult));
                                            break;
                                        }

                                    default:
                                        {
                                            // Handle other unexpected calls.
                                            throw new NotImplementedException($"Unknown function: {toolCall.FunctionName}");
                                        }
                                }
                            }

                            requiresAction = true;
                            break;
                        }

                    case ChatFinishReason.Length:
                        throw new NotImplementedException("Incomplete model output due to MaxTokens parameter or token limit exceeded.");

                    case ChatFinishReason.ContentFilter:
                        throw new NotImplementedException("Omitted content due to a content filter flag.");

                    case ChatFinishReason.FunctionCall:
                        throw new NotImplementedException("Deprecated in favor of tool calls.");

                    default:
                        throw new NotImplementedException(completion.FinishReason.ToString());
                }
            } while (requiresAction);

            return "No response generated.";
        }

        /// <summary>
        /// Simple demo method to test function calling without external dependencies
        /// </summary>
        /// <returns>A demonstration of the function calling process</returns>
        public static Task<string> SimpleFunctionCallingDemo()
        {
            // This is a simplified demo that shows the structure without requiring an API key
            var demoMessages = new List<string>();

            demoMessages.Add("User: What's the weather like today?");
            demoMessages.Add("Assistant: I'll help you get the current weather. Let me first get your location and then check the weather.");

            // Simulate function calls
            string location = GetCurrentLocation();
            demoMessages.Add($"Function Call: GetCurrentLocation() -> {location}");

            string weather = GetCurrentWeather(location);
            demoMessages.Add($"Function Call: GetCurrentWeather('{location}') -> {weather}");

            demoMessages.Add($"Assistant: The current weather in {location} is {weather}.");

            return Task.FromResult(string.Join("\n", demoMessages));
        }
    }
}