using Common.Models;
using StockDataAccess.DTOs;

namespace StockBusinessLogic.IHelpers
{
    public interface IIndustryHelper : IBaseAsyncHelper<IndustryDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
