using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IPropertyRepository : IGenericRepository<PropertyDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
