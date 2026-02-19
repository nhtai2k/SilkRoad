using Stock.DAL.DTOs;
using System.Share.Models;

namespace Stock.BLL.IHelpers
{
    public interface IIndustryHelper : IBaseAsyncHelper<IndustryDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
