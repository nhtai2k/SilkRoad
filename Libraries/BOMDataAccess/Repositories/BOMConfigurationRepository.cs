using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class BOMConfigurationRepository : GenericRepository<BOMConfigurationDTO>, IBOMConfigurationRepository
    {
        public BOMConfigurationRepository(ApplicationContext context) : base(context) { }

        public async Task<ICollection<BOMConfigurationDTO>?> GetChildrenByParentId(int parentId)
        {
            return await _dbSet.Where(s => s.ParentId == parentId).OrderBy(p => p.Priority).ToListAsync();
        }
    }
}
