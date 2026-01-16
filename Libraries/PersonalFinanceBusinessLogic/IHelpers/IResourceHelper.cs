using Common.Models;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IResourceHelper
    {
        public Task<Pagination<ResourceDTO>> GetAllAsync(int pageIndex, int pageSize, int userId);
        public Task<ResourceDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(ResourceDTO model);
        public Task<bool> UpdateAsync(ResourceDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
