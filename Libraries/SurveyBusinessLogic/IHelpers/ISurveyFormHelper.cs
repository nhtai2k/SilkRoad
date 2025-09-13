using Common.Models;
using Common.ViewModels.SurveyViewModels;

namespace SurveyBusinessLogic.IHelpers
{
    public interface ISurveyFormHelper : IBaseAsyncHelper<SurveyFormViewModel>
    {
        public SurveyFormViewModel GetEagerSurveyFormByID(int ID);
        public Task<SurveyUIViewModel> GetEagerSurveyUIByID(int ID, string language);
        public SurveyFormViewModel GetSurveyFormByID(int ID);
        public Task<Pagination<SurveyFormViewModel>> GetAllAsync(int pageIndex, int pageSize);
        public Task<IEnumerable<SurveyFormViewModel>> GetAllActiveAsync();
    }
}
