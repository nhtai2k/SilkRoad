using BOM.BLL.IHelpers;
using BOM.DAL;
using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Share.Models;

namespace BOM.BLL.Helpers
{
    public class UnitGroupHelper : IUnitGroupHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public UnitGroupHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<UnitGroupDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.UnitGroupRepository.GetAllAsync(x => !x.IsDeleted, orderBy: p => p.OrderBy(s => s.Priority));
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            foreach (var item in items)
            {
                item.Children = await _unitOfWork.UnitRepository.Query(s => s.UnitGroupId == item.Id, orderBy: p => p.OrderBy(s => s.Index)).ToListAsync();
            }
            return new Pagination<UnitGroupDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        // public async Task<Pagination<UnitGroupDTO>> GetAllActiveAsync(int pageIndex, int pageSize, string? search = null)
        // {
        //     var allItems = _unitOfWork.UnitGroupRepository.Query(x => !x.IsDeleted && x.IsActive);
        //     if (!string.IsNullOrEmpty(search))
        //     {
        //         allItems = allItems.Where(x => x.Name.Contains(search));
        //     }
        //     int totalItems = await allItems.CountAsync();
        //     int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //     if (pageIndex > totalPages)
        //         pageIndex = totalPages > 0 ? totalPages : 1;
        //     var items = await allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

        //     return new Pagination<UnitGroupDTO>
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
            return (await _unitOfWork.UnitGroupRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.Name
                });
        }
        // public async Task<IEnumerable<OptionModel>> GetTreeOptionListAsync()
        // {
        //     var data = await _unitOfWork.UnitGroupRepository.GetAllEagerUnitGroupsAsync();

        //    return data.Select(x =>
        //     {
        //         var option = new OptionModel
        //         {
        //             Id = x.Id,
        //             Name = x.Name
        //         };
        //         if (x.Children != null && x.Children.Any())
        //         {
        //             option.Children = x.Children.Select(c => new OptionModel
        //             {
        //                 Id = c.Id,
        //                 Name = c.Name,
        //                 ParentId = x.Id
        //             }).ToList();/*  */
        //         }
        //         return option;
        //     });
        // }
        public async Task<Pagination<UnitGroupDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.UnitGroupRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<UnitGroupDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<UnitGroupDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.UnitGroupRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(UnitGroupDTO model, string? username = null)
        {
            try
            {
                model.Create(username);
                model.Name = model.Name.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.UnitGroupRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(UnitGroupDTO model, string? username = null)
        {
            try
            {
                var data = await _unitOfWork.UnitGroupRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(username);
                data.Priority = model.Priority;
                data.IsActive = model.IsActive;
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
            var entity = await _unitOfWork.UnitGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? username = null)
        {
            var entity = await _unitOfWork.UnitGroupRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(username);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.UnitGroupRepository.DeleteAsync(id);
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
        public async Task<bool> IsNameExistsAsync(string name)
        {
            return await _unitOfWork.UnitGroupRepository.IsNameExistsAsync(name);
        }
    }
}
