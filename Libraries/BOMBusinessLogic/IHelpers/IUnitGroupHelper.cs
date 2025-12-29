using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IUnitGroupHelper : IBaseAsyncHelper<UnitGroupDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        //public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<bool> IsNameExistsAsync(string name);
    }
}
