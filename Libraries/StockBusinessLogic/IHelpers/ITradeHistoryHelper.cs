using Common.Models;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockBusinessLogic.IHelpers
{
    public interface ITradeHistoryHelper
    {
        public Task<Pagination<TradeHistoryDTO>> GetAllAsync(int pageIndex, int pageSize, int userId);
        public Task<TradeHistoryDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(TradeHistoryDTO model);
        public Task<bool> UpdateAsync(TradeHistoryDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
