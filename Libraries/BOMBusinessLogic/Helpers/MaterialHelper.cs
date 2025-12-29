using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess;
using BOMDataAccess.DTOs;
using Common;
using Common.Models;
using Common.Models.BOMModels;
using Common.Services.FileStorageServices;
using Microsoft.EntityFrameworkCore;
namespace BOMBusinessLogic.BOMHelpers
{
    public class MaterialHelper : IMaterialHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;

        public MaterialHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
        }


        public async Task<Pagination<MaterialDTO>> GetByFilterAsync(MaterialFilterModel model)
        {
            var allItems = _unitOfWork.MaterialRepository.Query(x => !x.IsDeleted);
            if (model.MaterialCategoryId > 0)
                allItems = allItems.Where(x => x.MaterialCategoryId == model.MaterialCategoryId);
            if (model.MaterialGroupId > 0)
                allItems = allItems.Where(x => x.MaterialGroupId == model.MaterialGroupId);
            if (model.UnitId > 0)
                allItems = allItems.Where(x => x.BaseUnitId == model.UnitId);
            if (!string.IsNullOrEmpty(model.SearchText))
                allItems = allItems.Where(x => x.Name.Contains(model.SearchText) || x.Code.Contains(model.SearchText));

            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)model.PageSize);
            if (model.PageIndex > totalPages)
                model.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((model.PageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new Pagination<MaterialDTO>
            {
                PageIndex = model.PageIndex,
                PageSize = model.PageSize,
                CurrentPage = model.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<MaterialDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.MaterialRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<MaterialDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        // public async Task<Pagination<MaterialDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.MaterialRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //     return new Pagination<MaterialDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<Pagination<MaterialDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.MaterialRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<MaterialDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<IEnumerable<OptionModel>> GetByMaterialGroupIdAsync(int materialGroupId)
        {
            var allItems = await _unitOfWork.MaterialRepository.Query(x => !x.IsDeleted && x.IsActive && x.MaterialGroupId == materialGroupId).ToListAsync();
            return allItems.Select(x => new OptionModel
            {
                Id = x.Id,
                Name = x.Name
            }); ;
        }


        public async Task<MaterialDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.MaterialRepository.GetByIdAsync(id);
        }

        private MaterialUnitDTO UpdateMaterialId(MaterialUnitDTO unit, int materialId)
        {
            unit.MaterialId = materialId;
            if (unit.Children != null && unit.Children.Any())
            {
                foreach (var child in unit.Children)
                {
                    UpdateMaterialId(child, materialId);
                }
            }
            return unit;
        }

        public async Task<bool> CreateAsync(MaterialDTO model, string? username = null)
        {
            using (var transaction = _unitOfWork.BeginTransaction())
            {
                try
                {
                    model.Create(username);
                    model.Code = model.Code.Trim();
                    model.Name = model.Name.Trim().ToLower();
                    model.Note = model.Note?.Trim();
                    List<MaterialUnitDTO>? materialUnits = model.MaterialUnits?.ToList();
                    model.MaterialUnits = null; // Clear the collection to avoid circular reference issues
                    if (model.ImageFile != null)
                    {
                        if (!_fileStorageService.IsImageFile(model.ImageFile))
                            return false;
                        model.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Materials.ToString()], model.ImageFile);
                    }
                    await _unitOfWork.MaterialRepository.CreateAsync(model);
                    await _unitOfWork.SaveChangesAsync();
                    if (materialUnits != null && materialUnits.Any())
                    {
                        foreach (var unit in materialUnits)
                        {
                            var temp = UpdateMaterialId(unit, model.Id);
                            _unitOfWork.MaterialUnitRepository.Create(temp);
                        }
                    }
                    await _unitOfWork.SaveChangesAsync();
                    _unitOfWork.Commit();

                    return true;
                }
                catch
                {
                    _unitOfWork.Rollback();
                    return false;
                }
            }
        }

        public async Task<bool> UpdateAsync(MaterialDTO model, string? username = null)
        {
            try
            {

                var data = await _unitOfWork.MaterialRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
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
                    data.ImagePath = _fileStorageService.SaveImageFile([EBOMFolders.Materials.ToString()], model.ImageFile);
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
            var entity = await _unitOfWork.MaterialRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.MaterialRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.MaterialRepository.DeleteAsync(id);
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
            return await _unitOfWork.MaterialRepository.IsCodeExistsAsync(code);
        }
    }
}
