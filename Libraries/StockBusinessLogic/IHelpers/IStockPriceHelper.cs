using Stock.DAL.DTOs;

namespace Stock.BLL.IHelpers
{
    public interface IStockPriceHelper
    {
        public Task<IEnumerable<StockPriceDTO>?> GetAllAsync(string symbol);
        public Task<bool> FetchData(string symbol);
    }
}
