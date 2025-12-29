using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IUnitRepository : IGenericRepository<UnitDTO>
    {
        public Task<bool> IsSymbolExistsAsync(string name);
    }
}
