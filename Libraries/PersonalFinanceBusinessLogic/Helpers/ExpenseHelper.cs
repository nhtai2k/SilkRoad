using Common.Models;
using Microsoft.EntityFrameworkCore;
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
        public async Task<Pagination<ExpenseDTO>> GetAllAsync(ExpenseFilterModel filter)
        {
            var query = _unitOfWork.ExpenseRepository.Query(x => x.UserId == filter.UserId);
            if (filter.FromDate != null)
            {
                query = query.Where(s => s.Date >= filter.FromDate);
            }
            if(filter.ToDate != null)
            {
                query = query.Where(s => s.Date <= filter.ToDate);
            }
            if(filter.CategoryId != null)
            {
                query = query.Where(s => s.CategoryId == filter.CategoryId);
            }
            if (filter.SubCategoryId != null)
            {
                query = query.Where(s => s.SubCategoryId == filter.SubCategoryId);
            }

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)filter.PageSize);
            if (filter.PageIndex > totalPages)
                filter.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
            return new Pagination<ExpenseDTO>
            {
                PageIndex = filter.PageIndex,
                PageSize = filter.PageSize,
                CurrentPage = filter.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        public async Task<bool> CreateAsync(ExpenseDTO model)
        {
            try
            {
                await _unitOfWork.ExpenseRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<ExpenseDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.ExpenseRepository.GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _unitOfWork.ExpenseRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ExpenseDTO model)
        {
            model.ModifiedAt = DateTime.UtcNow;
            await _unitOfWork.ExpenseRepository.UpdateAsync(model, model.Id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
