using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BOM.DAL.Repositories
{
    public class UnitRepository : GenericRepository<UnitDTO>, IUnitRepository
    {
        public UnitRepository(ApplicationContext context) : base(context) { }

        public async Task<bool> IsSymbolExistsAsync(string symbol)
        {
            return await _dbSet.AnyAsync(unit => unit.Symbol == symbol.Trim());
        }
    }
}
