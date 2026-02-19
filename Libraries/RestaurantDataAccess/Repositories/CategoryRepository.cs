using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
{
    public class CategoryRepository : GenericRepository<CategoryDTO>, ICategoryRepository
    {

        public CategoryRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
        private async Task LoadChildrenRecursiveAsync(CategoryDTO parent)
        {
            var children = await _dbSet
                .Where(dg => dg.ParentId == parent.Id)
                .Include(dg => dg.Dishes)
                .ToListAsync();

            parent.Children = children;

            foreach (var child in children)
            {
                await LoadChildrenRecursiveAsync(child);
            }
        }

        public async Task<CategoryDTO?> GetEargerByIdAsync(int id)
        {
            var root = await _dbSet
                .Include(dg => dg.Dishes)
                .Include(dg => dg.Parent)
                .FirstOrDefaultAsync(dg => dg.Id == id);

            if (root != null)
            {
                await LoadChildrenRecursiveAsync(root);
            }

            return root;
        }

        public async Task<ICollection<CategoryDTO>?> GetAllEagerCategoriesAsync()
        {
            return await _dbSet
                .Include(dg => dg.Children)
                .Where(dg => !dg.IsDeleted && dg.ParentId == null)
                .ToListAsync();
        }

        //public async Task<bool> IsCodeExistsAsync(string code)
        //{
        //    return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        //}
    }
}
