//using BusinessLogic.IBOMHelpers;
//using Common;
//using Common.Models;
//using Common.Services.FileStorageServices;
//using DataAccess;
//using DataAccess.BOMDTOs;
//namespace BusinessLogic.BOMHelpers;

//public class LocationHelper : ILocationHelper
//{
//    private readonly IUnitOfWork _unitOfWork;
//    private readonly IFileStorageService _fileStorageService;

//    public LocationHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
//    {
//        _unitOfWork = unitOfWork;
//        _fileStorageService = fileStorageService;
//    }

//    public async Task<Pagination<LocationDTO>> GetAllAsync(int pageIndex, int pageSize)
//    {
//        var allItems = await _unitOfWork.LocationRepository.GetAllAsync(x => !x.IsDeleted);
//        int totalItems = allItems.Count();
//        int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//        if (pageIndex > totalPages)
//            pageIndex = totalPages > 0 ? totalPages : 1;
//        var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//        return new Pagination<LocationDTO>
//        {
//            PageIndex = pageIndex,
//            PageSize = pageSize,
//            CurrentPage = pageIndex,
//            TotalItems = totalItems,
//            TotalPages = totalPages,
//            Items = items
//        };
//    }

//    // public async Task<Pagination<LocationDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
//    // {
//    //     var allItems = _unitOfWork.LocationRepository.Query(x => !x.IsDeleted && x.IsActive);
//    //     if (!string.IsNullOrEmpty(search))
//    //     {
//    //         allItems = allItems.Where(x => x.Name.Contains(search));
//    //     }
//    //     int totalItems = await allItems.CountAsync();
//    //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//    //     if (pageIndex > totalPages)
//    //         pageIndex = totalPages > 0 ? totalPages : 1;
//    //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
//    //     return new Pagination<LocationDTO>
//    //     {
//    //         PageIndex = pageIndex,
//    //         PageSize = pageSize,
//    //         CurrentPage = pageIndex,
//    //         TotalItems = totalItems,
//    //         TotalPages = totalPages,
//    //         Items = items
//    //     };
//    // }

//    public async Task<Pagination<LocationDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
//    {
//        var allItems = await _unitOfWork.LocationRepository.GetAllAsync(x => x.IsDeleted);
//        int totalItems = allItems.Count();
//        int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//        if (pageIndex > totalPages)
//            pageIndex = totalPages > 0 ? totalPages : 1;
//        var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//        return new Pagination<LocationDTO>
//        {
//            PageIndex = pageIndex,
//            PageSize = pageSize,
//            CurrentPage = pageIndex,
//            TotalItems = totalItems,
//            TotalPages = totalPages,
//            Items = items
//        };
//    }

//    public async Task<LocationDTO?> GetByIdAsync(int id)
//    {
//        return await _unitOfWork.LocationRepository.GetByIdAsync(id);
//    }

//    public async Task<bool> CreateAsync(LocationDTO model, string? userName = null)
//    {
//        try
//        {
//            model.Create(userName);
//            model.Code = model.Code.Trim();
//            model.Name = model.Name.Trim();
//            model.Note = model.Note?.Trim();
//            if (model.ImageFile != null)
//            {
//                if (!_fileStorageService.IsImageFile(model.ImageFile))
//                    return false;
//                model.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], model.ImageFile);
//            }
//            await _unitOfWork.LocationRepository.CreateAsync(model);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }
//        catch
//        {
//            return false;
//        }
//    }

//    public async Task<bool> UpdateAsync(LocationDTO model, string? username = null)
//    {
//        try
//        {
//            var data = await _unitOfWork.LocationRepository.GetByIdAsync(model.Id);
//            if (data == null) return false;
//            data.Update(username);
//            data.IsActive = model.IsActive;
//            data.Name = model.Name.Trim();
//            data.Note = model.Note?.Trim();
//            if (model.ImageFile != null)
//            {
//                if (!_fileStorageService.IsImageFile(model.ImageFile))
//                    return false;
//                // Delete old image if exists
//                if (!string.IsNullOrEmpty(data.ImagePath))
//                {
//                    _fileStorageService.DeleteFile(data.ImagePath);
//                }
//                data.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], model.ImageFile);
//            }
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }
//        catch
//        {
//            return false;
//        }
//    }

//    public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
//    {
//        var entity = await _unitOfWork.LocationRepository.GetByIdAsync(id);
//        if (entity == null) return false;
//        entity.SoftDelete(userName);
//        await _unitOfWork.SaveChangesAsync();
//        return true;
//    }

//    public async Task<bool> RestoreAsync(int id, string? userName = null)
//    {
//        var entity = await _unitOfWork.LocationRepository.GetByIdAsync(id);
//        if (entity == null) return false;
//        entity.Restore(userName);
//        await _unitOfWork.SaveChangesAsync();
//        return true;
//    }

//    public async Task<bool> DeleteAsync(int id)
//    {
//        try
//        {
//            bool deleteResult = await _unitOfWork.LocationRepository.DeleteAsync(id);
//            if (deleteResult)
//            {
//                await _unitOfWork.SaveChangesAsync();
//            }
//            return deleteResult;
//        }
//        catch
//        {
//            return false;
//        }
//    }
//}
