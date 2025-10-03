using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface ISurveyFormHelper : IBaseAsyncHelper<SurveyFormDTO>
    {
        public Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int id);
    }
}
