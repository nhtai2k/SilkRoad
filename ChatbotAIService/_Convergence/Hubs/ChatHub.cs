using Microsoft.AspNetCore.SignalR;

namespace ChatbotAIService._Convergence.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string response, IList<long>? context)
        {
            await Clients.All.SendAsync("ReceiveMessage", response, context);
        }
    }
}
