using ChatBot.Models;
using System.Share.Models;

namespace ChatBot.IServices;

public interface IConversationService
{
    Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter);
    Task<ConversationModel> GetByIdAsync(Guid Id);
    Task CreateAsync(ConversationModel entity);
}
