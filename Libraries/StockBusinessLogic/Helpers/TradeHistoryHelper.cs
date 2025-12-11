using Common.Models;
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
        public Task<Pagination<TradeHistoryDTO>> GetAllAsync(int pageIndex, int pageSize, int userId)
        {
            throw new NotImplementedException();
        }
        public Task<bool> CreateAsync(TradeHistoryDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }


        public Task<TradeHistoryDTO?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(TradeHistoryDTO model)
        {
            throw new NotImplementedException();
        }
    }
}
