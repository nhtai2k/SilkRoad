using Microsoft.AspNetCore.SignalR;

namespace Lipstick._Convergence.Hubs
{
    public class PaymentHub : Hub
    {
        public async Task SendPaymentStatus(string obj)
        {
            await Clients.All.SendAsync("ReceivePaymentStatus", obj);
        }
    }
}
