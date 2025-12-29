using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IUnitHelper : IBaseAsyncHelper<UnitDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<bool> IsSymbolExistsAsync(string name);
    }
}
