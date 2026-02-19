using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IMaterialRepository : IGenericRepository<MaterialDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
