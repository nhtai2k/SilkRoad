using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IMaterialGroupRepository : IGenericRepository<MaterialGroupDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
