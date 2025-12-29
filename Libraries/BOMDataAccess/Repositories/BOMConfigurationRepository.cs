using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOMDataAccess.Repositories
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
