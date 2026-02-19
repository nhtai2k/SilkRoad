using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class PageTypeRepository : GenericRepository<PageTypeDTO>, IPageTypeRepository
    {
        public PageTypeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}