using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionRepository : IGenericRepository<QuestionDTO>
    {
        public Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id);
        public Task<IEnumerable<QuestionDTO>> GetEagerLoadingByQuestionGroupIdAsync(Guid questionGroupId);
        public Task<IEnumerable<QuestionDTO>> GetEagerLoadingBySurveyFormIdAsync(int surveyFormId);

    }
}
