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
    public class CompanyRepository : GenericRepository<CompanyDTO>, ICompanyRepository
    {
        public CompanyRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<CompanyDTO> GetCompanyBySymbolAsync(string symbol)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Symbol == symbol);
        }
    }
}
