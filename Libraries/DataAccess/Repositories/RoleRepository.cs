using DataAccess.DTOs;
using DataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class RoleRepository : GenericRepository<RoleDTO>, IRoleRepository
    {
        public RoleRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }

        //public Task<RoleDTO> GetEagerRoleByIdAsync(int id)
        //{
        //    var data = _roles.Where(r => r.Id == id).Include(r => r.RoleClaims).ThenInclude(src => src.RoleClaim).FirstOrDefault();
        //    throw new NotImplementedException();
        //}
    }
}
