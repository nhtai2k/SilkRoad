using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class PredefinedAnswerRepository : GenericRepository<PredefinedAnswerDTO>, IPredefinedAnswerRepository
    {
        public PredefinedAnswerRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId)
        {
            return await _dbSet.Where(s => s.QuestionId == questionId).OrderBy(s => s.Priority).ToListAsync();
        }
    }
}
