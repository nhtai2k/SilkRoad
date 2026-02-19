using BOM.BLL.IHelpers;
using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Share.Models;

namespace BOM.BLL.Helpers
{
    public class BOMQueryHelper : IBOMQueryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public BOMQueryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<BOMDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.BOMRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<BOMDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<BOMDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.BOMRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<BOMDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<BOMDTO?> GetByIdAsync(int id)
        {
            var bom = await _unitOfWork.BOMRepository.GetByIdAsync(id);
            if (bom == null)
                return null;
            bom.BOMCategories = await GetBOMCategoryAsync(id);
            return bom;
        }

        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _unitOfWork.BOMRepository.IsCodeExistsAsync(code);
        }

        private async Task<ICollection<BOMCategoryDTO>> GetBOMCategoryAsync(int bomId)
        {
            var bomCategories = await _unitOfWork.BOMCategoryRepository.Query(s => s.ParentId == null && s.BOMId == bomId).ToListAsync();
            foreach (var category in bomCategories)
            {
                category.Children = await GetBOMCategoryByParentIdAsync(category.Id, bomId);
            }
            return bomCategories;
        }

        private async Task<ICollection<BOMCategoryDTO>> GetBOMCategoryByParentIdAsync(Guid parentId, int bomId)
        {
            var categories = await _unitOfWork.BOMCategoryRepository.Query(s => s.ParentId == parentId && s.BOMId == bomId).ToListAsync();
            foreach (var category in categories)
            {
                category.Children = await GetBOMCategoryByParentIdAsync(category.Id, bomId);
            }
            return categories;
        }

    }
}
