using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IQuestionRepository : IGenericRepository<QuestionDTO>
    {
        public Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id);
        public Task<IEnumerable<QuestionDTO>> GetEagerLoadingByQuestionGroupIdAsync(Guid questionGroupId);
        public Task<IEnumerable<QuestionDTO>> GetEagerLoadingBySurveyFormIdAsync(int surveyFormId);

    }
}
