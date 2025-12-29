using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IBOMConfigurationHelper : IBaseAsyncHelper<BOMConfigurationDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
