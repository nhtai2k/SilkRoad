using PersonalFinance.DAL.DTOs;
using System.Share.Models;

namespace PersonalFinance.BLL.IHelpers
{
    public interface ICategoryHelper : IBaseAsyncHelper<CategoryDTO>
    {
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
