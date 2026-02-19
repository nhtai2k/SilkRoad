using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class UnitGroupRepository : GenericRepository<UnitGroupDTO>, IUnitGroupRepository
    {
        public UnitGroupRepository(ApplicationContext context) : base(context) { }

        public async Task<IEnumerable<UnitGroupDTO>> GetAllEagerUnitGroupsAsync()
        {
            return await _dbSet
                .Include(ug => ug.Children)
                .Where(ug => !ug.IsDeleted)
                .OrderBy(ug => ug.Priority)
                .ToListAsync();
        }

        public async Task<bool> IsNameExistsAsync(string name)
        {
            return await _dbSet.AnyAsync(unit => unit.Name.ToLower() == name.Trim().ToLower());
        }
    }
}
