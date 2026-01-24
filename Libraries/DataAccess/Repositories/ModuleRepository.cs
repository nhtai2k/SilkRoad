using Microsoft.EntityFrameworkCore;
using System.DAL.DTOs;
using System.DAL.IRepositories;

namespace System.DAL.Repositories
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
