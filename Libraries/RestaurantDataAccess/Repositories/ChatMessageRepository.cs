using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.DTOs;
using RestaurantDataAccess.IRepositories;

namespace RestaurantDataAccess.Repositories
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
