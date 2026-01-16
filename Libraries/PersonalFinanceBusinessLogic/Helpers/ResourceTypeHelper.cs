using Common.Models;
using Microsoft.EntityFrameworkCore;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class ResourceTypeHelper : IResourceTypeHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ResourceTypeHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<ResourceTypeDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var query = _unitOfWork.ResourceTypeRepository.Query(x => !x.IsDeleted);
            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<ResourceTypeDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<ResourceTypeDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.ResourceTypeRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<ResourceTypeDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(ResourceTypeDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.Name = model.Name.Trim();
                await _unitOfWork.ResourceTypeRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(ResourceTypeDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.ResourceTypeRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
                data.Name = model.Name.Trim();
                data.Priority = model.Priority;
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
            var entity = await _unitOfWork.ResourceTypeRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.ResourceTypeRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.ResourceTypeRepository.DeleteAsync(id);
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

        public async Task<ResourceTypeDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.ResourceTypeRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            return (await _unitOfWork.ResourceTypeRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive)).Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.Name
            });
        }
    }
}
