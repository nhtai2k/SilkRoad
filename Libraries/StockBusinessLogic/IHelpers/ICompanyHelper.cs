using StockBusinessLogic.Models;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockBusinessLogic.IHelpers
{
    public interface ICompanyHelper : IBaseAsyncHelper<CompanyDTO>
    {
        public Task<List<string>> GetAllSymbolsAsync();
    }
}
