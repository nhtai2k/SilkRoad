using Microsoft.AspNetCore.SignalR;

namespace RestaurantBusinessLogic.Helpers
{
    public class BookingHub : Hub
    {
        public async Task ReceiveMessage(string message)
        {
            // Send a message to all connected clients
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task GuestArrived()
        {
            await Clients.All.SendAsync("GuestArrived");
        }
    }
}
