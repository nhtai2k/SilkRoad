using Common.Models;
using Microsoft.EntityFrameworkCore;
using StockBusinessLogic.IHelpers;
using StockDataAccess;
using StockDataAccess.DTOs;

namespace StockBusinessLogic.Helpers
{
    public class HandbookHelper : IHandbookHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public HandbookHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAsync(HandbookDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                await _unitOfWork.HandbookRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.HandbookRepository.DeleteAsync(id);
                if (deleteResult)
                {
                    await _unitOfWork.SaveChangesAsync();
                }
                return deleteResult;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Pagination<HandbookDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        {
            var allItems = _unitOfWork.HandbookRepository.Query(x => !x.IsDeleted && x.IsActive);
            if (!string.IsNullOrEmpty(search))
            {
                allItems = allItems.Where(x => x.Title.Contains(search) || x.Content.Contains(search));
            }
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<HandbookDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<HandbookDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.HandbookRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<HandbookDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<HandbookDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.HandbookRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<HandbookDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<HandbookDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.HandbookRepository.GetByIdAsync(id);
        }

        public async Task<bool> RestoreAsync(Guid id, string? userName = null)
        {
            var entity = await _unitOfWork.HandbookRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(Guid id, string? userName = null)
        {
            var entity = await _unitOfWork.HandbookRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(HandbookDTO model, string? userName = null)
        {
            try
            {
                model.Update(userName);
                bool updateResult = await _unitOfWork.HandbookRepository.UpdateAsync(model, model.Id);
                if (updateResult)
                    await _unitOfWork.SaveChangesAsync();
                return updateResult;
            }
            catch
            {
                return false;
            }
        }
    }
}
