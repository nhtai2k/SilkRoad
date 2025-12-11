using StockDataAccess.DTOs;
using StockDataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockDataAccess.IRepositories
{
    public interface ITradeHistoryRepository : IGenericRepository<TradeHistoryDTO>
    {
    }
}
