using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;
using BOMDataAccess.QureyModels;
using Microsoft.EntityFrameworkCore;

namespace BOMDataAccess.Repositories
{
    public class EnergyRepository : GenericRepository<EnergyDTO>, IEnergyRepository
    {
        public EnergyRepository(ApplicationContext context) : base(context) { }

        public async Task<ICollection<EnergyQueryModel>> ExportDataAsync()
        {
            var sql = @"select energies.Code, energies.[Name], energies.Price, units.Symbol, energies.Note
                        from Table_Energies as energies
                        left join Table_Units as units on energies.UnitId = units.Id
                        where energies.IsDeleted = 0 and energies.IsActive = 1";
            var data = await _context.Database.SqlQueryRaw<EnergyQueryModel>(sql).ToListAsync();

            return data;
        }

        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _dbSet.AnyAsync(unit => unit.Code.ToLower() == code.Trim().ToLower());
        }

    }
}
