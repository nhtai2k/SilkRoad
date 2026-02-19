using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IRoleRepository : IGenericRepository<RoleDTO>
    {
        //public Task<RoleDTO> GetEagerRoleByIdAsync(int id);
    }
}
