using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IMaterialRepository : IGenericRepository<MaterialDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
