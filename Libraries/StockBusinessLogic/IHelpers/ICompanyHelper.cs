using Common.Models;
using StockDataAccess.DTOs;

namespace StockBusinessLogic.IHelpers
{
    public interface ICompanyHelper : IBaseAsyncHelper<CompanyDTO>
    {
        public Task<List<string>> GetAllSymbolsAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<CompanyDTO>> GetAllAsync(int pageIndex, int pageSize, int industryId);
    }
}
