using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IUnitGroupRepository : IGenericRepository<UnitGroupDTO>
    {
        public Task<bool> IsNameExistsAsync(string name);
        public Task<IEnumerable<UnitGroupDTO>> GetAllEagerUnitGroupsAsync();
    }
}
