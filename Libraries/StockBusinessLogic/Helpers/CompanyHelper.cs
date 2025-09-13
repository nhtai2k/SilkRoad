using Common.Models;
using Microsoft.EntityFrameworkCore;
using StockBusinessLogic.IHelpers;
using StockDataAccess;
using StockDataAccess.DTOs;

namespace StockBusinessLogic.Helpers
{
    public class CompanyHelper : ICompanyHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public CompanyHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> CreateAsync(CompanyDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.Symbol = model.Symbol.ToUpper();
                await _unitOfWork.CompanyRepository.CreateAsync(model);
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
                bool deleteResult = await _unitOfWork.CompanyRepository.DeleteAsync(id);
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

        public async Task<Pagination<CompanyDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.CompanyRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<CompanyDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<CompanyDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        {
            var allItems = _unitOfWork.CompanyRepository.Query(x => !x.IsDeleted && x.IsActive);
            if (!string.IsNullOrEmpty(search))
            {
                allItems = allItems.Where(x => x.Name.Contains(search));
            }
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<CompanyDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<List<string>> GetAllSymbolsAsync()
        {
            List<string> symbols = new List<string>();
            var allItems = await _unitOfWork.CompanyRepository.Query(x => !x.IsDeleted && x.IsActive).ToListAsync();
            foreach (var item in allItems)
            {
               symbols.Add(item.Symbol);
            }
            return symbols;
        }

        public async Task<Pagination<CompanyDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.CompanyRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<CompanyDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<CompanyDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.CompanyRepository.GetByIdAsync(id);
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.CompanyRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.CompanyRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(CompanyDTO model, string? userName = null)
        {
            try
            {
                model.Update(userName);
                model.Symbol = model.Symbol.ToUpper();
                bool updateResult = await _unitOfWork.CompanyRepository.UpdateAsync(model, model.Id);
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
