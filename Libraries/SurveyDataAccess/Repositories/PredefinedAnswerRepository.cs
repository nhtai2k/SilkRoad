using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
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
