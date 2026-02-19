using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IPropertyTypeRepository : IGenericRepository<PropertyTypeDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
