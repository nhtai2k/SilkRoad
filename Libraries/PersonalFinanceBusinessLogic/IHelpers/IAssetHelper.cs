using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IAssetHelper
    {
        public Task<Pagination<AssetDTO>> GetAllAsync(int pageIndex, int pageSize, int userId);
        public Task<AssetDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(AssetDTO model);
        public Task<bool> UpdateAsync(AssetDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
