using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IModuleRepository : IGenericRepository<ModuleDTO>
    {
        public Task<ICollection<ModuleDTO>> GetEagerAllAsync();
    }
}
