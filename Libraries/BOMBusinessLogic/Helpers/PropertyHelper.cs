using BOM.BLL.IHelpers;
using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Share;
using System.Share.Models;
using System.Share.Models.BOMModels;
using System.Share.Services.FileStorageServices;
namespace BOM.BLL.Helpers
{
    public class PropertyHelper : IPropertyHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;

        public PropertyHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
        }
        public async Task<Pagination<PropertyDTO>> GetByFilterAsync(PropertyFilterModel model)
        {
            var allItems = _unitOfWork.PropertyRepository.Query(x => !x.IsDeleted);
            //if (model.PropertyTypeId > 0)
            //    allItems = allItems.Where(x => x.PropertyTypeId == model.PropertyTypeId);
            if (model.DepartmentId > 0)
                allItems = allItems.Where(x => x.DepartmentId == model.DepartmentId);
            if (model.UnitId > 0)
                allItems = allItems.Where(x => x.UnitId == model.UnitId);
            if (!string.IsNullOrEmpty(model.SearchText))
                allItems = allItems.Where(x => x.Name.Contains(model.SearchText) || x.Code.Contains(model.SearchText));

            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)model.PageSize);
            if (model.PageIndex > totalPages)
                model.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((model.PageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new Pagination<PropertyDTO>
            {
                PageIndex = model.PageIndex,
                PageSize = model.PageSize,
                CurrentPage = model.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        public async Task<Pagination<PropertyDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.PropertyRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<PropertyDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        // public async Task<Pagination<PropertyDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.PropertyRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<PropertyDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<PropertyDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.PropertyRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<PropertyDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        //public async Task<IEnumerable<PropertyDTO>> GetByPropertyTypeIdAsync(int propertyTypeId)
        //{
        //    var query = _unitOfWork.PropertyRepository.Query(s => !s.IsDeleted && s.IsActive && s.PropertyTypeId == propertyTypeId);
        //    return await query.ToListAsync();
        //}

        public async Task<PropertyDTO?> GetByIdAsync(int id)
        {
            var data = await _unitOfWork.PropertyRepository.GetByIdAsync(id);
            if (data != null && data.Price != null && data.Price != 0 && data.Depreciation != null)
            {
                data.DepreciationValue = data.Price / data.Depreciation;
            }
            else if (data != null)
            {
                data.DepreciationValue = 0;
            }
            return data;
        }

        public async Task<bool> CreateAsync(PropertyDTO model, string? username = null)
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
                    model.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Properties.ToString()], model.ImageFile);
                }
                await _unitOfWork.PropertyRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(PropertyDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.PropertyRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                //data.PropertyTypeId = model.PropertyTypeId;
                data.DepartmentId = model.DepartmentId;
                data.UnitId = model.UnitId;
                data.TimeUnitId = model.TimeUnitId;
                //data.Quantity = model.Quantity;
                data.Price = model.Price;
                //data.DepreciationPeriod = model.DepreciationPeriod;
                data.IsActive = model.IsActive;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();

                //check if the image file is provided and valid
                if (model.ImageFile != null)
                {
                    // Validate the image file
                    if (!_fileStorageService.IsImageFile(model.ImageFile))
                        return false;
                    // Delete old image if exists
                    if (!string.IsNullOrEmpty(data.ImagePath))
                    {
                        _fileStorageService.DeleteFile(data.ImagePath);
                    }
                    // Save the new image file
                    data.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Properties.ToString()], model.ImageFile);
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
            var entity = await _unitOfWork.PropertyRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.PropertyRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.PropertyRepository.DeleteAsync(id);
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
            return await _unitOfWork.PropertyRepository.IsCodeExistsAsync(code);
        }
    }
}
