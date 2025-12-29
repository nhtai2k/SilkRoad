using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IKitchenHelper : IBaseAsyncHelper<KitchenDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
