using Common.Models;
using Microsoft.EntityFrameworkCore;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class AssetHelper : IAssetHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public AssetHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Pagination<AssetDTO>> GetAllAsync(int pageIndex, int pageSize, int userId)
        {
            var query = _unitOfWork.AssetRepository.Query(x => x.UserId == userId, includeProperties: "AssetType");

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<AssetDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        public async Task<bool> CreateAsync(AssetDTO model)
        {
            try
            {
                model.Note = model.Note?.Trim();
                await _unitOfWork.AssetRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<AssetDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.AssetRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(AssetDTO model)
        {
            try
            {
                var data = await _unitOfWork.AssetRepository.GetByIdAsync(model.Id);
                if (data == null) return false;
                data.ModifiedAt = DateTime.Now;
                data.TypeId = model.TypeId;
                data.Quantity = model.Quantity;
                data.Amount = model.Amount;
                data.Date = model.Date;
                data.Note = model.Note?.Trim();
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.AssetRepository.DeleteAsync(id);
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
