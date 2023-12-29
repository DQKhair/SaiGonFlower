using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace FlowerStore.Hubs
{
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> connectedClients = new Dictionary<string, string>();
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }


        //public async Task SendToUser(string user, string userId, string message)
        //{
        //    await Clients.Client(userId).SendAsync("ReceiveMessage", user, message, userId);
        //}

        public async Task JoinChat(string user, string message)
        {
            connectedClients[Context.ConnectionId] = user;
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }

        private async Task LeaveChat()
        {
            if (connectedClients.TryGetValue(Context.ConnectionId, out string user))
            {
                var message = $"{user} left the chat";
                await Clients.Others.SendAsync("ReceiveMessage", user, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await LeaveChat();
            await base.OnDisconnectedAsync(exception);

        }

    }
}
