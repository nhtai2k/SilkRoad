using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.IRepositories
{
    public interface ICompanyRepository : IGenericRepository<CompanyDTO>
    {
        public Task<CompanyDTO> GetCompanyBySymbolAsync(string symbol);
    }
}
