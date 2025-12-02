using Common.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IStoreHelper : IBaseAsyncHelper<StoreDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
