using PersonalFinance.BLL.IHelpers;
using PersonalFinance.DAL;
using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.Helpers
{
    public class SubCategoryHelper : ISubCategoryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public SubCategoryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<SubCategoryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.SubCategoryRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<SubCategoryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<SubCategoryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.SubCategoryRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<SubCategoryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(SubCategoryDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.NameEN = model.NameEN.Trim();
                model.NameVN = model.NameVN.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.SubCategoryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(SubCategoryDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.SubCategoryRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
                data.NameEN = model.NameEN.Trim();
                data.NameVN = model.NameVN.Trim();
                data.Note = model.Note?.Trim();
                data.IsActive = model.IsActive;
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.SubCategoryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.SubCategoryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.SubCategoryRepository.DeleteAsync(id);
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

        public async Task<SubCategoryDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.SubCategoryRepository.GetByIdAsync(id);
        }



    }
}

