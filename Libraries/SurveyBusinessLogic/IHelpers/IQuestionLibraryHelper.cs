using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionLibraryHelper : IBaseAsyncHelper<QuestionLibraryDTO>
    {
        //public Task<Pagination<QuestionViewModel>> GetAllAsync(int questionGroupID, int pageIndex, int pageSize);
        //public Task<IEnumerable<QuestionViewModel>> GetAllAsync(int applyTo, int? questionGroupId);
    }
}
