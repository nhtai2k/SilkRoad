using Common.Models;
using Common.Services.FileStorageServices;
using RestaurantBusinessLogic.IHelpers;
using RestaurantBusinessLogic.Models;
using RestaurantDataAccess;
using RestaurantDataAccess.DTOs;

namespace RestaurantBusinessLogic.Helpers
{
    public class CategoryHelper : ICategoryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;

        public CategoryHelper(IUnitOfWork unitOfWork, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
        }

        public async Task<Pagination<CategoryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.CategoryRepository.GetAllAsync(x => !x.IsDeleted && x.ParentId == null);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            foreach (var item in items)
            {
                var temp = await _unitOfWork.CategoryRepository.GetEargerByIdAsync(item.Id);
                if (temp != null)
                {
                    item.Children = temp.Children;
                }
            }
            return new Pagination<CategoryDTO>
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
            return (await _unitOfWork.CategoryRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.NameVN
                });
        }

        public async Task<IEnumerable<OptionModel>> GetTreeOptionListAsync()
        {
            var data = await _unitOfWork.CategoryRepository.GetAllEagerCategoriesAsync();

            return data.Select(x =>
             {
                 var option = new OptionModel
                 {
                     Id = x.Id,
                     Name = x.NameVN
                 };
                 if (x.Children != null && x.Children.Any())
                 {
                     option.Children = x.Children.Select(c => new OptionModel
                     {
                         Id = c.Id,
                         Name = c.NameVN,
                         ParentId = x.Id
                     }).ToList();/*  */
                 }
                 return option;
             });
        }

        public async Task<Pagination<CategoryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.CategoryRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<CategoryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<CategoryDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.CategoryRepository.GetByIdAsync(id);
        }

        public async Task<CategoryDTO?> GetEagerByIdAsync(int id)
        {
            return await _unitOfWork.CategoryRepository.GetEargerByIdAsync(id);
        }

        private void ApplyCreateMetadataRecursively(CategoryDTO group, string? username)
        {
            group.Create(username); // Apply to current group
            group.NameEN = group.NameEN.Trim();
            group.NameVN = group.NameVN.Trim();
            group.NameCN = group.NameCN.Trim();
            group.Note = group.Note?.Trim();
            //if (group.ImageFile != null)
            //{
            //    if (!_fileStorageService.IsImageFile(group.ImageFile))
            //        return;
            //    group.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.DishGroups.ToString()], group.ImageFile);
            //}
            // Apply to all dishes in this group
            if (group.Dishes != null)
            {
                foreach (var dish in group.Dishes)
                {
                    dish.Create(username);
                    dish.NameEN = dish.NameEN.Trim();
                    dish.NameVN = dish.NameVN.Trim();
                    dish.NameCN = dish.NameCN.Trim();
                    dish.Note = dish.Note?.Trim();
                    //if (dish.ImageFile != null)
                    //{
                    //    if (!_fileStorageService.IsImageFile(dish.ImageFile))
                    //        return;
                    //    dish.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.DishGroups.ToString()], dish.ImageFile);
                    //}
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

        public async Task<bool> CreateAsync(CategoryDTO model, string? username = null)
        {
            try
            {
                ApplyCreateMetadataRecursively(model, username);
                await _unitOfWork.CategoryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(CategoryDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.CategoryRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.NameEN = model.NameEN.Trim();
                data.NameVN = model.NameVN.Trim();
                data.NameCN = model.NameCN.Trim();
                data.Priority = model.Priority;
                data.Note = model.Note?.Trim();
                //if (model.ImageFile != null)
                //{
                //    if (!_fileStorageService.IsImageFile(model.ImageFile))
                //        return false;
                //    // Delete old image if exists
                //    if (!string.IsNullOrEmpty(data.ImagePath))
                //    {
                //        _fileStorageService.DeleteFile(data.ImagePath);
                //    }
                //    data.ImagePath = _fileStorageService.SaveImageFile([EFolderNames.DishGroups.ToString()], model.ImageFile);
                //}
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
            var entity = await _unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.CategoryRepository.DeleteAsync(id);
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
        //public async Task<bool> IsCodeExistsAsync(string code)
        //{
        //    return await _unitOfWork.CategoryRepository.IsCodeExistsAsync(code);
        //}
    }

}
