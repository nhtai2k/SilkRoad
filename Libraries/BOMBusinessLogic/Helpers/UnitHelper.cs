using BOMBusinessLogic.IBOMHelpers;
using BOMDataAccess;
using BOMDataAccess.DTOs;
using Common.Models;
using Microsoft.EntityFrameworkCore;
namespace BOMBusinessLogic.BOMHelpers
{
    public class UnitHelper : IUnitHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public UnitHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<UnitDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.UnitRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<UnitDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        // public async Task<Pagination<UnitDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.UnitRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

        //     return new Pagination<UnitDTO>
        //     {
        //         PageIndex = pageIndex,
        //         PageSize = pageSize,
        //         CurrentPage = pageIndex,
        //         TotalItems = totalItems,
        //         TotalPages = totalPages,
        //         Items = items
        //     };
        // }

        public async Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            return (await _unitOfWork.UnitRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.Name
                });
        }
        public async Task<IEnumerable<OptionModel>> GetTreeOptionListAsync()
        {
            var data = await _unitOfWork.UnitGroupRepository.GetAllEagerUnitGroupsAsync();

            return data.Select(x =>
             {
                 var option = new OptionModel
                 {
                     Id = x.Id,
                     Name = x.Name
                 };
                 if (x.Children != null && x.Children.Any())
                 {
                     option.Children = x.Children.Select(c => new OptionModel
                     {
                         Id = c.Id,
                         Name = c.Symbol,
                         ParentId = x.Id
                     }).ToList();/*  */
                 }
                 return option;
             });
        }
        public async Task<Pagination<UnitDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.UnitRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<UnitDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<UnitDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.UnitRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(UnitDTO model, string? username = null)
        {
            try
            {
                model.Create(username);
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.UnitRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(UnitDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.UnitRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.IsActive = model.IsActive;
                data.Symbol = model.Symbol;
                data.Coefficient = model.Coefficient;
                data.Name = model.Name.Trim();
                data.Note = model.Note?.Trim();
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
            var entity = await _unitOfWork.UnitRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.UnitRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.UnitRepository.DeleteAsync(id);
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
        public async Task<bool> IsSymbolExistsAsync(string name)
        {
            return await _unitOfWork.UnitRepository.IsSymbolExistsAsync(name);
        }
    }
}
