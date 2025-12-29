using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IPropertyTypeRepository : IGenericRepository<PropertyTypeDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
