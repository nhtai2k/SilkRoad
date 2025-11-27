using Microsoft.EntityFrameworkCore;
using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess.Repositories
{
    public class CategoryRepository : GenericRepository<CategoryDTO>, ICategoryRepository
    {
        public CategoryRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CategoryDTO>> GetEagerLoadingAsync()
        {
            return await _dbSet.Include(c => c.SubCategories).ToListAsync();
        }
    }
}
