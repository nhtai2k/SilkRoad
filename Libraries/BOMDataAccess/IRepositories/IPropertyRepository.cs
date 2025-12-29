using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IPropertyRepository : IGenericRepository<PropertyDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
