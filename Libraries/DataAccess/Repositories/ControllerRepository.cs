using DataAccess.DTOs;
using DataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class ControllerRepository : GenericRepository<ControllerDTO>, IControllerRepository
    {
        public ControllerRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }

        //public async Task<IEnumerable<ControllerDTO>> GetEagerClaimGroupAllAsync()
        //{
        //    return await _roleClaimGroupDTO
        //        .Include(s => s.RoleClaims.Where(sub => sub.IsActive && !sub.IsDeleted))
        //        .Where(s => s.IsActive && !s.IsDeleted && s.RoleClaims != null && s.RoleClaims.Count > 0)
        //        .ToListAsync();
        //}
    }
}
