using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IRoleClaimRepository : IGenericRepository<RoleClaimDTO>
    {
        Task RemoveSelectedRoleClaimByRoleID(int roleID);
    }
}
