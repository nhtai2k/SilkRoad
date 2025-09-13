using Common.Models;
using Common.ViewModels.SurveyViewModels;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionHelper : IBaseAsyncHelper<QuestionViewModel>
    {
        public Task<Pagination<QuestionViewModel>> GetAllAsync(int questionGroupID, int pageIndex, int pageSize);
        //public Task<IEnumerable<QuestionViewModel>> GetAllAsync(int applyTo, int? questionGroupId);
    }
}
