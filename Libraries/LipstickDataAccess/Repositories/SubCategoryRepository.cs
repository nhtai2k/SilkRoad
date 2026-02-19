using Lipstick.DAL.DTOs;
using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL.Repositories
{
    public class SubCategoryRepository : GenericRepository<SubCategoryDTO>, ISubCategoryRepository
    {
        public SubCategoryRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
