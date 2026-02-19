using Microsoft.EntityFrameworkCore;
using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
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
