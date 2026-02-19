using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;

namespace BOM.DAL.Repositories
{
    public class BOMCategoryRepository : GenericRepository<BOMCategoryDTO>, IBOMCategoryRepository
    {
        public BOMCategoryRepository(ApplicationContext context) : base(context) { }
    }
}
