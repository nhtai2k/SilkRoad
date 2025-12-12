using Common.Models;
using Microsoft.EntityFrameworkCore;
using StockBusinessLogic.IHelpers;
using StockDataAccess;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockBusinessLogic.Helpers
{
    public class TradeHistoryHelper : ITradeHistoryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public TradeHistoryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<Pagination<TradeHistoryDTO>> GetAllAsync(int pageIndex, int pageSize, int userId)
        {
            var query = _unitOfWork.TradeHistoryRepository.Query(x => x.UserId == userId).AsNoTracking();
            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            if (pageIndex > totalPages)
                pageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.OrderByDescending(x => x.TradeDate).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Pagination<TradeHistoryDTO>
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                CurrentPage = pageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }
        
        public async Task<bool> CreateAsync(TradeHistoryDTO model)
        {
            try
            {
                await _unitOfWork.TradeHistoryRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch(Exception Ex)
            {
                Console.WriteLine(Ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                bool deleteResult = await _unitOfWork.TradeHistoryRepository.DeleteAsync(id);
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

        public async Task<TradeHistoryDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.TradeHistoryRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(TradeHistoryDTO model)
        {
            try
            {
                bool updateResult = await _unitOfWork.TradeHistoryRepository.UpdateAsync(model, model.Id);
                if (updateResult)
                    await _unitOfWork.SaveChangesAsync();
                return updateResult;
            }
            catch
            {
                return false;
            }
        }
    }
}
