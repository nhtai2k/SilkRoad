using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.IHelpers
{
    public interface IUnitHelper : IBaseAsyncHelper<UnitDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
