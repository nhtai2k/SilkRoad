using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IUnitGroupRepository : IGenericRepository<UnitGroupDTO>
    {
        public Task<bool> IsNameExistsAsync(string name);
        public Task<IEnumerable<UnitGroupDTO>> GetAllEagerUnitGroupsAsync();
    }
}
