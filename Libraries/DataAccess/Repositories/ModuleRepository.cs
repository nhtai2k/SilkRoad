using DataAccess.DTOs;
using DataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class ModuleRepository : GenericRepository<ModuleDTO>, IModuleRepository
    {
        public ModuleRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<ICollection<ModuleDTO>> GetEagerAllAsync()
        {
            ICollection<ModuleDTO> data = await _dbSet.Include(s => s.Controllers).ThenInclude(s => s.ControllerActions).ToListAsync();
            return data;
        }
    }
}
