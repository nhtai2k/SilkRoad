using Member.DAL.DTOs;

namespace Member.DAL.IRepositories
{
    public interface IRoleRepository : IGenericRepository<RoleDTO>
    {
        //public Task<RoleDTO> GetEagerRoleByIdAsync(int id);
    }
}
