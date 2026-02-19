using Restaurant.BLL.IHelpers;
using Restaurant.DAL;
using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.Helpers
{
    public class TableHelper : ITableHelper
    {
        private readonly IUnitOfWork _unitOfWork;

        public TableHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<TableDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.TableRepository.GetAllAsync(x => !x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<TableDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<Pagination<TableDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            var allItems = await _unitOfWork.TableRepository.GetAllAsync(x => x.IsDeleted);
            int totalItems = allItems.Count();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return new Pagination<TableDTO>
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
            return (await _unitOfWork.TableRepository.GetAllAsync(x => !x.IsDeleted && x.IsActive))
                .Select(x => new OptionModel
                {
                    Id = x.Id,
                    Name = x.NameVN
                });
        }
        public async Task<TableDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.TableRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(TableDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.NameVN = model.NameVN.Trim();
                model.NameEN = model.NameEN.Trim();
                model.NameCN = model.NameCN.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.TableRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(TableDTO model, string? userName = null)
        {
            try
            {
                var data = await _unitOfWork.TableRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.Update(userName);
                data.NameVN = model.NameVN.Trim();
                data.NameEN = model.NameEN.Trim();
                data.NameCN = model.NameCN.Trim();
                data.Note = model.Note?.Trim();
                data.Capacity = model.Capacity;
                data.IsFree = model.IsFree;
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
            var entity = await _unitOfWork.TableRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SoftDelete(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreAsync(int id, string? userName = null)
        {
            var entity = await _unitOfWork.TableRepository.GetByIdAsync(id);
            if (entity == null) return false;
            entity.Restore(userName);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.TableRepository.DeleteAsync(id);
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
    }
}