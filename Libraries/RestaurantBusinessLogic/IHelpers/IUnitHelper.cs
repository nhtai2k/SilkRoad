using Common.Models;
using RestaurantDataAccess.DTOs;

namespace RestaurantBusinessLogic.IHelpers
{
    public interface IUnitHelper : IBaseAsyncHelper<UnitDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
