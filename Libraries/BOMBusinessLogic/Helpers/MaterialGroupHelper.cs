using BOM.BLL.IHelpers;
using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Share;
using System.Share.Models;
using System.Share.Services.FileStorageServices;
namespace BOM.BLL.Helpers
{
    public class MaterialGroupHelper : IMaterialGroupHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;
        public MaterialGroupHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
        }
        public async Task<Pagination<MaterialGroupDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.MaterialGroupRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new Pagination<MaterialGroupDTO>
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
            return (await _unitOfWork.MaterialGroupRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive)).Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.Name
            });
        }

        // public async Task<Pagination<MaterialGroupDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.MaterialGroupRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<MaterialGroupDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<MaterialGroupDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.MaterialGroupRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<MaterialGroupDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<MaterialGroupDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.MaterialGroupRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(MaterialGroupDTO model, string? username = null)
        {
            try
            {
                model.Create(username);
                model.Code = model.Code.Trim();
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                if (model.ImageFile != null)
                {
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    model.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.MaterialGroups.ToString()], model.ImageFile);
                }
                await _unitOfWork.MaterialGroupRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(MaterialGroupDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.MaterialGroupRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();
                //check if the code or name already exists
                if (model.ImageFile != null)
                {
                    // Validate if the uploaded file is an image
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    // Delete old image if exists
                    if (!string.IsNullOrEmpty(data.ImagePath))
                    {
                        _fileStorageService.DeleteFile(data.ImagePath);
                    }
                    // Save the new image file
                    data.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.MaterialGroups.ToString()], model.ImageFile);
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
            var entity = await _unitOfWork.MaterialGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.MaterialGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.MaterialGroupRepository.DeleteAsync(id);
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
            return await _unitOfWork.MaterialGroupRepository.IsCodeExistsAsync(code);
        }
    }
}
