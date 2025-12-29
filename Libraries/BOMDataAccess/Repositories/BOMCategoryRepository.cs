using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;

namespace BOMDataAccess.Repositories
{
    public class BOMCategoryRepository : GenericRepository<BOMCategoryDTO>, IBOMCategoryRepository
    {
        public BOMCategoryRepository(ApplicationContext context) : base(context) { }
    }
}
