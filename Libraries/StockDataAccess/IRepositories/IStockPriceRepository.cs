using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.IRepositories
{
    public interface IStockPriceRepository : IGenericRepository<StockPriceDTO>
    {
        public Task<StockPriceDTO?> GetLastPriceAsync(int companyId);
    }
}
