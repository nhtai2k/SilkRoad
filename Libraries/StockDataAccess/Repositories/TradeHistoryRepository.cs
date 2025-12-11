using StockDataAccess.DTOs;
using StockDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockDataAccess.Repositories
{
    public class TradeHistoryRepository : GenericRepository<TradeHistoryDTO>, ITradeHistoryRepository
    {
        public TradeHistoryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
