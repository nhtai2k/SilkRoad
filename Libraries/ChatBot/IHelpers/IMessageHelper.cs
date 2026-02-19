using ChatBot.Models;

namespace ChatBot.IHelpers;

public interface IMessageHelper
{
    public Task<IEnumerable<MessageModel>> GetByConversationIdAsync(Guid conversationId);
}
