using System;
using ChatBot.IHelpers;
using ChatBot.Models;

namespace ChatBot.Helpers;

public class MessageHelper : IMessageHelper
{
    public Task<IEnumerable<MessageModel>> GetByConversationIdAsync(Guid conversationId)
    {
        throw new NotImplementedException();
    }
}
