using Stock.DAL.DTOs;

namespace Stock.DAL.IRepositories
{
    public interface IStockPriceRepository : IGenericRepository<StockPriceDTO>
    {
        public Task<StockPriceDTO?> GetLastPriceAsync(int companyId);
    }
}
