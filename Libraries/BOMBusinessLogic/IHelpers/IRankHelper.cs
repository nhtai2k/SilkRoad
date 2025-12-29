using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IRankHelper : IBaseAsyncHelper<RankDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<bool> IsCodeExistsAsync(string code);

    }
}
