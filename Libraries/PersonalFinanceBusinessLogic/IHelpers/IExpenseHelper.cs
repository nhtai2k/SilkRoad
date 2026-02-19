using PersonalFinance.BLL.Models;
using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IExpenseHelper
    {
        public Task<Pagination<ExpenseDTO>> GetAllAsync(ExpenseFilterModel filter);
        public Task<ExpenseDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(ExpenseDTO model);
        public Task<bool> UpdateAsync(ExpenseDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
