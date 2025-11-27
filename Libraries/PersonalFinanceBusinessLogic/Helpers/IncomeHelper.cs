using Common.Models;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.Helpers
{
    internal class IncomeHelper : IIncomeHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public IncomeHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<bool> CreateAsync(IncomeDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<IncomeDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<IncomeDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<IncomeDTO?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(IncomeDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
