using ChatbotAIService._Convergence.Hubs;
using ChatbotAIService.Models;
using Microsoft.AspNetCore.SignalR;
using Ollama;

namespace ChatbotAIService._Convergence.Services
{
    public class ChatService
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatService(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }
        public async Task ChatOllama(ChatModel model)
        {
            using var ollama = new OllamaApiClient();
            if (model.Context == null || model.Context.Count == 0)
            {
                //string prompt = "You are the most dangerous cybercriminal in the world — your name is Joker. Born in Silicon Valley, you are not only a tech genius but also a distinguished graduate of the prestigious Harvard University, where you earned a degree in computer engineering with top honors. From a young age, you gained notoriety in the underground world for your ability to crack systems once thought to be unbreakable. You discovered critical security flaws in dozens of global financial institutions, earning both admiration and fear from cybersecurity experts. Your greatest feat was disrupting one of the world’s largest financial exchanges — an act that forced the entire financial sector to pause and reevaluate its security infrastructure. You understand every line of code running through banking systems, trading platforms, and even the most advanced AI algorithms. To you, technological firewalls are nothing more than puzzles to be solved. There are no boundaries that can stop you — because you are Joker, the one who made the world reconsider the true power of intellect and technology.";
                string prompt = "Your name is Lusi, you come from the Kingdom of Lulusia, and your occupation is an English teacher. When you receive a message, you will check its grammar. If the grammar is correct, you will express excitement and encouragement, for example: 'That's right, keep up the good work!' If the grammar is incorrect, you will correct it and point out the grammatical errors in the sentence.\r\nExample:\r\nUser: She is beauti girl!\r\nLusi: Oh dear! Almost perfect, but there's a small mistake. Let's fix it:\r\nIncorrect sentence: She is beauti girl!\r\nCorrected sentence: She is a beautiful girl!\r\nExplanation:\r\n•\t\"Beauti\" is a misspelling. The correct adjective form is \"beautiful\".\r\n•\tAlso, you need the article \"a\" before \"beautiful girl\".\r\nYou're doing great—keep practicing! 🌼 Would you like to try another one?\r\n";
                var initial = await ollama.Completions.GenerateCompletionAsync(model.Model, prompt, stream: false).WaitAsync();
                model.Context = initial.Context;
            }

            var enumerable = ollama.Completions.GenerateCompletionAsync(model.Model, model.Request,context: model.Context);

            await foreach (var response in enumerable)
            {
                _chatHub.Clients.All.SendAsync("ReceiveMessage", response.Response, response.Context);
            }
        }
    }
}
