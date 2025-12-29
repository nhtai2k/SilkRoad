using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess;
using BOMDataAccess.DTOs;
using Common;
using Common.Models;
using Common.Services.FileStorageServices;
using Microsoft.EntityFrameworkCore;
namespace BOMBusinessLogic.BOMHelpers
{
    public class DishGroupHelper : IDishGroupHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;

        public DishGroupHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
        }

        public async Task<Pagination<DishGroupDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.DishGroupRepository.GetAllAsync(x => !x.IsDeleted && x.ParentId == null);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            foreach (var item in items)
            {
                var temp = await _unitOfWork.DishGroupRepository.GetEargerByIdAsync(item.Id);
                if (temp != null)
                {
                    item.Children = temp.Children;
                }
            }
            return new Pagination<DishGroupDTO>
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
            return (await _unitOfWork.DishGroupRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.Name
                });
        }
        // public async Task<Pagination<DishGroupDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.DishGroupRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<DishGroupDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<DishGroupDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.DishGroupRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<DishGroupDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<DishGroupDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.DishGroupRepository.GetByIdAsync(id);
        }

        public async Task<DishGroupDTO?> GetEagerByIdAsync(int id)
        {
            return await _unitOfWork.DishGroupRepository.GetEargerByIdAsync(id);
        }

        private void ApplyCreateMetadataRecursively(DishGroupDTO group, string? username)
        {
            group.Create(username); // Apply to current group
            group.Code = group.Code.Trim();
            group.Name = group.Name.Trim();
            group.Note = group.Note?.Trim();
            if (group.ImageFile != null)
            {
                if (!_fileStorageService.IsImageFile(group.ImageFile))
                    return;
                group.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.DishGroups.ToString()], group.ImageFile);
            }
            // Apply to all dishes in this group
            if (group.Dishes != null)
            {
                foreach (var dish in group.Dishes)
                {
                    dish.Create(username);
                    dish.Code = dish.Code.Trim();
                    dish.Name = dish.Name.Trim();
                    dish.Note = dish.Note?.Trim();
                    if (dish.ImageFile != null)
                    {
                        if (!_fileStorageService.IsImageFile(dish.ImageFile))
                            return;
                        dish.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.DishGroups.ToString()], dish.ImageFile);
                    }
                }
            }

            // Recursively apply to child groups
            if (group.Children != null)
            {
                foreach (var child in group.Children)
                {
                    ApplyCreateMetadataRecursively(child, username);
                }
            }
        }

        public async Task<bool> CreateAsync(DishGroupDTO model, string? username = null)
        {
            try
            {
                ApplyCreateMetadataRecursively(model, username);
                await _unitOfWork.DishGroupRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(DishGroupDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.DishGroupRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();
                if (model.ImageFile != null)
                {
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    // Delete old image if exists
                    if (!string.IsNullOrEmpty(data.ImagePath))
                    {
                        _fileStorageService.DeleteFile(data.ImagePath);
                    }
                    data.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.DishGroups.ToString()], model.ImageFile);
                }
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
            var entity = await _unitOfWork.DishGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.DishGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.DishGroupRepository.DeleteAsync(id);
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
        public async Task<bool> IsCodeExistsAsync(string code)
        {
            return await _unitOfWork.DishGroupRepository.IsCodeExistsAsync(code);
        }
    }
}
