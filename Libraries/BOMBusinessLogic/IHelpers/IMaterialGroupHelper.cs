using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IMaterialGroupHelper : IBaseAsyncHelper<MaterialGroupDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
