using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOMDataAccess.Repositories
{
    public class MaterialRepository : GenericRepository<MaterialDTO>, IMaterialRepository
    {
        public MaterialRepository(ApplicationContext context) : base(context) { }
        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        }
    }
}
