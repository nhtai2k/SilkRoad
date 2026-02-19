using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IMaterialGroupRepository : IGenericRepository<MaterialGroupDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
