using System;
using ChatBot.Models;
using Common.Models;

namespace ChatBot.IHelpers;

public interface IConversationHelper
{
        Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter);
}
