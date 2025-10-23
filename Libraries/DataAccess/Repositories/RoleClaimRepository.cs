using DataAccess.DTOs;
using DataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class RoleClaimRepository : GenericRepository<RoleClaimDTO>, IRoleClaimRepository
    {
        public RoleClaimRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task RemoveSelectedRoleClaimByRoleID(int roleID)
        {
            var data = await _dbSet.Where(src => src.RoleId == roleID).ToListAsync();
            data.ForEach(src => _dbSet.Remove(src));
        }
    }
}
