using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IMaterialCategoryRepository : IGenericRepository<MaterialCategoryDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
