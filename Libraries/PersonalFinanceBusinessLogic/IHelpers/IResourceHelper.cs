using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
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
