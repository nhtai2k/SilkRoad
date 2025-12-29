//using BusinessLogic.IBOMHelpers;
//using Common;
//using Common.Models;
//using Common.Services.FileStorageServices;
//using DataAccess;
//using DataAccess.BOMDTOs;
//namespace BusinessLogic.BOMHelpers
//{
//    public class MallHelper : IMallHelper
//    {
//        private readonly IUnitOfWork _unitOfWork;
//        private readonly IFileStorageService _fileStorageService;

//        public MallHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
//        {
//            _unitOfWork = unitOfWork;
//            _fileStorageService = fileStorageService;
//        }

//        public async Task<Pagination<MallDTO>> GetAllAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.MallRepository.GetAllAsync(x => !x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            foreach (var item in items)
//            {
//                var temp = await _unitOfWork.MallRepository.GetEagerByIdAsync(item.Id);
//                if (temp != null && temp.Locations != null && temp.Locations.Any())
//                {
//                    item.Locations = temp.Locations;
//                }
//            }
//            return new Pagination<MallDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        // public async Task<Pagination<MallDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
//        // {
//        //     var allItems = _unitOfWork.MallRepository.Query(x => !x.IsDeleted && x.IsActive);
//        //     if (!string.IsNullOrEmpty(search))
//        //     {
//        //         allItems = allItems.Where(x => x.Name.Contains(search));
//        //     }
//        //     int totalItems = await allItems.CountAsync();
//        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//        //     if (pageIndex > totalPages)
//        //         pageIndex = totalPages > 0 ? totalPages : 1;
//        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
//        //     return new Pagination<MallDTO>
//        //     {
//        //         PageIndex = pageIndex,
//        //         PageSize = pageSize,
//        //         CurrentPage = pageIndex,
//        //         TotalItems = totalItems,
//        //         TotalPages = totalPages,
//        //         Items = items
//        //     };
//        // }

//        public async Task<Pagination<MallDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
//        {
//            var allItems = await _unitOfWork.MallRepository.GetAllAsync(x => x.IsDeleted);
//            int totalItems = allItems.Count();
//            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
//            if (pageIndex > totalPages)
//                pageIndex = totalPages > 0 ? totalPages : 1;
//            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
//            return new Pagination<MallDTO>
//            {
//                PageIndex = pageIndex,
//                PageSize = pageSize,
//                CurrentPage = pageIndex,
//                TotalItems = totalItems,
//                TotalPages = totalPages,
//                Items = items
//            };
//        }

//        public async Task<MallDTO?> GetByIdAsync(int id)
//        {
//            return await _unitOfWork.MallRepository.GetByIdAsync(id);
//        }

//        public async Task<MallDTO?> GetEagerByIdAsync(int id)
//        {
//            return await _unitOfWork.MallRepository.GetEagerByIdAsync(id);
//        }

//        public async Task<bool> CreateAsync(MallDTO model, string? username = null)
//        {
//            try
//            {
//                model.Create(username);
//                model.Code = model.Code.Trim();
//                model.Name = model.Name.Trim();
//                model.Note = model.Note?.Trim();
//                if (model.ImageFile != null)
//                {
//                    if (!_fileStorageService.IsImageFile(model.ImageFile))
//                        return false;
//                    model.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], model.ImageFile);
//                }
//                //Check if the model has locations and areas, and create them as well
//                if (model.Locations != null && model.Locations.Any())
//                {
//                    foreach (var location in model.Locations)
//                    {
//                        location.Create(username);
//                        location.Code = location.Code.Trim();
//                        location.Name = location.Name.Trim();
//                        location.Note = location.Note?.Trim();
//                        if (location.ImageFile != null)
//                        {
//                            if (!_fileStorageService.IsImageFile(location.ImageFile))
//                                return false;
//                            location.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], location.ImageFile);
//                        }
//                        // Check if the location has areas and create them as well
//                        if (location.Areas != null && location.Areas.Any())
//                        {
//                            foreach (var area in location.Areas)
//                            {
//                                area.Create(username);
//                                area.Code = area.Code.Trim();
//                                area.Name = area.Name.Trim();
//                                area.Note = area.Note?.Trim();
//                                if (area.ImageFile != null)
//                                {
//                                    if (!_fileStorageService.IsImageFile(area.ImageFile))
//                                        return false;
//                                    area.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], area.ImageFile);
//                                }
//                            }
//                        }
//                    }
//                }
//                await _unitOfWork.MallRepository.CreateAsync(model);
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> UpdateAsync(MallDTO model, string? username = null)
//        {
//            try
//            {

//                var data = await _unitOfWork.MallRepository.GetByIdAsync(model.Id);
//                if (data == null) return false;
//                data.Update(username);
//                data.IsActive = model.IsActive;
//                data.Name = model.Name.Trim();
//                data.Note = model.Note?.Trim();
//                if (model.ImageFile != null)
//                {
//                    if (!_fileStorageService.IsImageFile(model.ImageFile))
//                        return false;
//                    // Delete old image if exists
//                    if (!string.IsNullOrEmpty(data.ImagePath))
//                    {
//                        _fileStorageService.DeleteFile(data.ImagePath);
//                    }
//                    data.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.Malls.ToString()], model.ImageFile);
//                }
//                await _unitOfWork.SaveChangesAsync();
//                return true;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//        public async Task<bool> SoftDeleteAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.MallRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.SoftDelete(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> RestoreAsync(int id, string? username = null)
//        {
//            var entity = await _unitOfWork.MallRepository.GetByIdAsync(id);
//            if (entity == null) return false;
//            entity.Restore(username);
//            await _unitOfWork.SaveChangesAsync();
//            return true;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            try
//            {
//                bool deleteResult = await _unitOfWork.MallRepository.DeleteAsync(id);
//                if (deleteResult)
//                {
//                    await _unitOfWork.SaveChangesAsync();
//                }
//                return deleteResult;
//            }
//            catch
//            {
//                return false;
//            }
//        }

//    }
//}
