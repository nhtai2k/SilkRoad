using MemberDataAccess.DTOs;

namespace MemberDataAccess.IRepositories
{
    public interface IRoleRepository : IGenericRepository<RoleDTO>
    {
        //public Task<RoleDTO> GetEagerRoleByIdAsync(int id);
    }
}
