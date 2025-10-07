using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IPredefinedAnswerRepository : IGenericRepository<PredefinedAnswerDTO>
    {
        public Task<IEnumerable<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId);
    }
}
