using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IResourceTypeHelper : IBaseAsyncHelper<ResourceTypeDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
