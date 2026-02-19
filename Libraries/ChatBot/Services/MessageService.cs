using ChatBot.IServices;
using ChatBot.Models;
using MongoDB.Driver;

namespace ChatBot.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationConnection _applicationConnection;

        public MessageService(ApplicationConnection applicationConnection)
        {
            _applicationConnection = applicationConnection;
        }

        public async Task CreateAsync(MessageModel entity) =>
            await _applicationConnection._messagesCollection.InsertOneAsync(entity);

        public async Task DeleteAsync(int Id) =>
            await _applicationConnection._messagesCollection.DeleteOneAsync(x => x.Id == Id.ToString());

        public async Task<IEnumerable<MessageModel>> GetAllAsync() =>
            await _applicationConnection._messagesCollection.Find(_ => true).ToListAsync();

        public async Task<MessageModel> GetByIdAsync(int Id) =>
            await _applicationConnection._messagesCollection.Find(x => x.Id == Id.ToString()).FirstOrDefaultAsync();

        public async Task UpdateAsync(MessageModel entity) =>
            await _applicationConnection._messagesCollection.ReplaceOneAsync(x => x.Id == entity.Id, entity);

        public async Task<MessageModel> GetLastMessageAsync(Guid conversationId)
        {
            return await _applicationConnection._messagesCollection
                .Find(x => x.ConversationId == conversationId && x.Sender != "User")
                .SortByDescending(x => x.Timestamp)
                .FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<MessageModel>> GetMessagesAsync(Guid conversationId)
        {
            return await _applicationConnection._messagesCollection
                .Find(x => x.ConversationId == conversationId)
                .SortByDescending(x => x.Timestamp)
                .ToListAsync();
        }
    }
}