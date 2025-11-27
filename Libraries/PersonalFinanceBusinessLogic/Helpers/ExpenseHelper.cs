using Common.Models;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class ExpenseHelper : IExpenseHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ExpenseHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<bool> CreateAsync(ExpenseDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ExpenseDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ExpenseDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<ExpenseDTO?> GetByIdAsync(int id)
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

        public Task<bool> UpdateAsync(ExpenseDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
