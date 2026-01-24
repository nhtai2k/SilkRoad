using ChatBot.Models;
using System.Share.Models;

namespace ChatBot.IHelpers;

public interface IConversationHelper
{
    Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter);
}
