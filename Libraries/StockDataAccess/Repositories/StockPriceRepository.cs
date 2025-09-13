using Microsoft.EntityFrameworkCore;
using StockDataAccess.DTOs;
using StockDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.Repositories
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
