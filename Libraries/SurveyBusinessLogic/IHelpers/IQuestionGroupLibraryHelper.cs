using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionGroupLibraryHelper : IBaseAsyncHelper<QuestionGroupLibraryDTO>
    {
        //public IEnumerable<QuestionGroupViewModel> GetEagerAllElements(bool getActive = false);
        //public QuestionGroupViewModel GetEagerQuestionGroupByID(int ID);
        //public Task<Pagination<QuestionGroupViewModel>> GetAllAsync(int pageIndex, int pageSize, bool getActive = false);
        //public Task<IEnumerable<QuestionGroupViewModel>> GetAllByActiveAsync(bool getActive = false);
    }
}
