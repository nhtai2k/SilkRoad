using Stock.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Share.Models;
using System.Text;

namespace Stock.BLL.IHelpers
{
    public interface ICoveredWarrantHelper
    {
        public Task<Pagination<CoveredWarrantDTO>> GetAllAsync(int pageIndex, int pageSize, int companyId);
        public Task<CoveredWarrantDTO?> GetByIdAsync(int id);
        public Task<bool> CreateAsync(CoveredWarrantDTO model, string? userName = null);
        public Task<bool> UpdateAsync(CoveredWarrantDTO model, string? userName = null);
    }
}
