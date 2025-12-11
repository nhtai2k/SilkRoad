using Common.Models;
using Microsoft.EntityFrameworkCore;
using StockBusinessLogic.IHelpers;
using StockDataAccess;
using StockDataAccess.DTOs;

namespace StockBusinessLogic.Helpers
{
    public class IndustryHelper : IIndustryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public IndustryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> CreateAsync(IndustryDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                await _unitOfWork.IndustryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.IndustryRepository.DeleteAsync(id);
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

        public async Task<Pagination<IndustryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.IndustryRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<IndustryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<IndustryDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        {
            var allItems = _unitOfWork.IndustryRepository.Query(x => !x.IsDeleted && x.IsActive);
            if (!string.IsNullOrEmpty(search))
            {
                allItems = allItems.Where(x => x.Name.Contains(search));
            }
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<IndustryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<IndustryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.IndustryRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<IndustryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<IndustryDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.IndustryRepository.GetByIdAsync(id);
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.IndustryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.IndustryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(IndustryDTO model, string? userName = null)
        {
            try
            {
                model.Update(userName);
                bool updateResult = await _unitOfWork.IndustryRepository.UpdateAsync(model, model.Id);
                if (updateResult)
                    await _unitOfWork.SaveChangesAsync();
                return updateResult;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            var data = await _unitOfWork.IndustryRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive);
            return data.Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.Name
            });
        }
    }
}
