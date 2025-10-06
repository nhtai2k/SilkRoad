using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionRepository : IGenericRepository<QuestionDTO>
    {
        public Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id);
    }
}
