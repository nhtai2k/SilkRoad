using Common.Models;
using RestaurantDataAccess.DTOs;

namespace RestaurantBusinessLogic.IHelpers
{
    public interface ITableHelper : IBaseAsyncHelper<TableDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();

    }
}