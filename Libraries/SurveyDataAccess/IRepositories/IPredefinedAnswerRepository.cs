using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IPredefinedAnswerRepository : IGenericRepository<PredefinedAnswerDTO>
    {
        public Task<IEnumerable<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId);
    }
}
