using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class TopicRepository : GenericRepository<TopicDTO>, ITopicRepository
    {
        public TopicRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
