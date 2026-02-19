using Microsoft.EntityFrameworkCore;
using PersonalFinance.BLL.IHelpers;
using PersonalFinance.DAL;
using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.Helpers
{
    public class ResourceHelper : IResourceHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ResourceHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Pagination<ResourceDTO>> GetAllAsync(int pageIndex, int pageSize, int userId)
        {
            var query = _unitOfWork.ResourceRepository.Query(x => x.UserId == userId).OrderByDescending(s => s.Date).AsNoTracking();

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<ResourceDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(ResourceDTO model)
        {
            await _unitOfWork.ResourceRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<ResourceDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.ResourceRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(ResourceDTO model)
        {
            model.ModifiedAt = DateTime.UtcNow;
            await _unitOfWork.ResourceRepository.UpdateAsync(model, model.Id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _unitOfWork.ResourceRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
