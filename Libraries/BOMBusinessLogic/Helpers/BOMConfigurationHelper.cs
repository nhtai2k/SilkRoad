using BOM.BLL.IHelpers;
using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Share.Models;

namespace BOM.BLL.Helpers
{
    public class BOMConfigurationHelper : IBOMConfigurationHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public BOMConfigurationHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<BOMConfigurationDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = _unitOfWork.BOMConfigurationRepository.Query(x => !x.IsDeleted && x.ParentId == null, orderBy: p => p.OrderBy(s => s.Priority));
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

            foreach (var s in items)
            {
                s.Children = await _unitOfWork.BOMConfigurationRepository.GetChildrenByParentId(s.Id);
            }

            return new Pagination<BOMConfigurationDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        // public async Task<Pagination<BOMCategoryDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.BOMCategoryRepository.Query(x => !x.IsDeleted && x.IsActive && x.ParentId == null);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<BOMCategoryDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<BOMConfigurationDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.BOMConfigurationRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<BOMConfigurationDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            return (await _unitOfWork.BOMConfigurationRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive && x.ParentId == null))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.Name
                });
        }

        public async Task<BOMConfigurationDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.BOMConfigurationRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(BOMConfigurationDTO model, string? username = null)
        {
            try
            {
                model.Create(username);
                model.Code = model.Code.Trim();
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.BOMConfigurationRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();


                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(BOMConfigurationDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.BOMConfigurationRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.Priority = model.Priority;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();
                data.Tag = model.Tag;

                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.BOMConfigurationRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.BOMConfigurationRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.BOMConfigurationRepository.DeleteAsync(id);
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


    }
}
