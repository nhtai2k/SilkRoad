using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IUnitRepository : IGenericRepository<UnitDTO>
    {
        public Task<bool> IsSymbolExistsAsync(string name);
    }
}
