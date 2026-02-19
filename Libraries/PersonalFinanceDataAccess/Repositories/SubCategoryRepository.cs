using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
{
    public class SubCategoryRepository : GenericRepository<SubCategoryDTO>, ISubCategoryRepository
    {
        public SubCategoryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
