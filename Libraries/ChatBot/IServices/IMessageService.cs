using ChatBot.Models;

namespace ChatBot.IServices
{
    public interface IMessageService
    {
        Task<IEnumerable<MessageModel>> GetAllAsync();
        Task<MessageModel> GetByIdAsync(int Id);
        Task CreateAsync(MessageModel entity);
        Task UpdateAsync(MessageModel entity);
        Task DeleteAsync(int Id);
        Task<MessageModel> GetLastMessageAsync(Guid conversationId);
        Task<IEnumerable<MessageModel>> GetMessagesAsync(Guid conversationId);

    }
}