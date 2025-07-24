using ChatbotAIService._Convergence.Common;
using ChatbotAIService.Models;
using Newtonsoft.Json;
using OpenAI.Chat;

namespace ChatbotAIService._Convergence.Services
{
    public class BeeService
    {
        private readonly string configFilePath = "./_Convergence/Services/beeConfig.json";
        //private readonly string configFilePath = Path.Combine(AppContext.BaseDirectory, "config.json");

        public async Task<BeeModoel> ChatBee(BeeModoel model)
        {
            ChatClient client = new(model: "gpt-4.1", apiKey: Constants.ChatGPTKey);
            var mod = GetBeeConfig(model.Mod);
            if(mod == null)
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

            ChatCompletion completion = await client.CompleteChatAsync(messages);
            model.Response = completion.Content[0].Text;
            return model;
        }
    
        public BeeConfigModel? GetBeeConfig(int Id)
        {
            using (StreamReader reader = new StreamReader(configFilePath))
            {
                string json = reader.ReadToEnd();
                var result = JsonConvert.DeserializeObject<List<BeeConfigModel>>(json);
                if (result != null)
                {
                    return result.FirstOrDefault(x => x.Id == Id) ?? new BeeConfigModel();
                }
                else
                {
                    return null;

                }
            }
        }
    }
}
