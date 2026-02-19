using Stock.DAL.DTOs;
using System.Share.Models;

namespace Stock.BLL.IHelpers
{
    public interface ICompanyHelper : IBaseAsyncHelper<CompanyDTO>
    {
        public Task<List<string>> GetAllSymbolsAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<Pagination<CompanyDTO>> GetAllAsync(int pageIndex, int pageSize, int industryId);
    }
}
