using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
{
    public class ChatMessageRepository : GenericRepository<ChatMessageDTO>, IChatMessageRepository
    {
        private DbSet<ChatMessageDTO> _chatMessages;

        public ChatMessageRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _chatMessages = dbContext.Set<ChatMessageDTO>();
        }
    }
}
