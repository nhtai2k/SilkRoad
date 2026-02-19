using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IQuestionGroupRepository : IGenericRepository<QuestionGroupDTO>
    {
        public Task<IEnumerable<QuestionGroupDTO>?> GetEagerLoadingBySurveyFormIdAsync(int surveyFormId);
        //public IEnumerable<QuestionGroupLibraryDTO> GetEagerAllElements();
        //public QuestionGroupLibraryDTO? GetEagerQuestionGroupById(int id);
    }
}
