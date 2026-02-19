using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class MenuGroupRepository : GenericRepository<CategoryDTO>, ICategoryRepository
    {
        public MenuGroupRepository(ApplicationContext dbContext) : base(dbContext) { }
    }
}
