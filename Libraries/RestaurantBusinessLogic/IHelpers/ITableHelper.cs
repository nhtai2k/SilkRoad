using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.IHelpers
{
    public interface ITableHelper : IBaseAsyncHelper<TableDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();

    }
}