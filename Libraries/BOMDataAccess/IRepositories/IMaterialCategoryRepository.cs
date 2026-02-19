using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IMaterialCategoryRepository : IGenericRepository<MaterialCategoryDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
