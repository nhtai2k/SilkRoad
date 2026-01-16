using Common.Models;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.IHelpers
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
