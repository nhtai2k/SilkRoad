using StockBusinessLogic.Models;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockBusinessLogic.IHelpers
{
    public interface IStockPriceHelper
    {
        public Task<IEnumerable<StockPriceDTO>> GetAllAsync(string symbol);
        public Task<bool> FetchData(string symbol);
    }
}
