using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.IHelpers
{
    public interface IStoreHelper : IBaseAsyncHelper<StoreDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
