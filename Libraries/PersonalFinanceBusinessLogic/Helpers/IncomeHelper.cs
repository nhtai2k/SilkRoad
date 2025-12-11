using Common.Models;
using Microsoft.EntityFrameworkCore;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class IncomeHelper : IIncomeHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public IncomeHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Pagination<IncomeDTO>> GetAllAsync(int pageIndex, int pageSize, int userId)
        {
            var query = _unitOfWork.IncomeRepository.Query(x => x.UserId == userId);

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<IncomeDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(IncomeDTO model)
        {
            await _unitOfWork.IncomeRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<IncomeDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.IncomeRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(IncomeDTO model)
        {
            model.ModifiedAt = DateTime.UtcNow;
            await _unitOfWork.IncomeRepository.UpdateAsync(model, model.Id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _unitOfWork.IncomeRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
