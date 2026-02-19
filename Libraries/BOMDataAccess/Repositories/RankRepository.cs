using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class RankRepository : GenericRepository<RankDTO>, IRankRepository
    {
        public RankRepository(ApplicationContext context) : base(context) { }

        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        }
    }
}
