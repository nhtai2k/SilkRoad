using Microsoft.EntityFrameworkCore;
using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;

namespace Stock.DAL.Repositories
{
    public class StockPriceRepository : GenericRepository<StockPriceDTO>, IStockPriceRepository
    {
        public StockPriceRepository(ApplicationContext context) : base(context)
        {
        }

        public Task<StockPriceDTO?> GetLastPriceAsync(int companyId)
        {
            // Get the most recent StockPriceDTO by Date descending
            return _dbSet.Where(sp => sp.CompanyId == companyId)
                .OrderByDescending(sp => sp.Date)
                .FirstOrDefaultAsync();
        }
    }
}
