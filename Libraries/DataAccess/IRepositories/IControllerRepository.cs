using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IControllerRepository : IGenericRepository<ControllerDTO>
    {
        //public Task<IEnumerable<ControllerDTO>> GetEagerClaimGroupAllAsync();
    }
}
