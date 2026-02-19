using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class DishGroupRepository : GenericRepository<DishGroupDTO>, IDishGroupRepository
    {
        public DishGroupRepository(ApplicationContext context) : base(context)
        {
        }
        private async Task LoadChildrenRecursiveAsync(DishGroupDTO parent)
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

        public async Task<DishGroupDTO?> GetEargerByIdAsync(int id)
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

        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        }

    }
}
