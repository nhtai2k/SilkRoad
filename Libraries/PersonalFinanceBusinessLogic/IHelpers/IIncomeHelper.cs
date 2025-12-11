using Common.Models;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IIncomeHelper
    {
        public Task<Pagination<IncomeDTO>> GetAllAsync(int pageIndex, int pageSize, int userId);
        public Task<IncomeDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(IncomeDTO model);
        public Task<bool> UpdateAsync(IncomeDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
