using Microsoft.AspNetCore.SignalR;

namespace ChatBot.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string response, IList<long>? context)
        {
            await Clients.All.SendAsync("ReceiveMessage", response, context);
        }
    }
}
