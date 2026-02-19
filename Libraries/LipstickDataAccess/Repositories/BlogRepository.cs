using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class BlogRepository : GenericRepository<BlogDTO>, IBlogRepository
    {
        public BlogRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
