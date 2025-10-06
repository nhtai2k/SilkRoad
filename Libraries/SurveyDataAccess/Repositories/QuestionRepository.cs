using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionRepository : GenericRepository<QuestionDTO>, IQuestionRepository
    {

        public QuestionRepository(ApplicationContext dbContext) : base(dbContext)
        {}

        public async Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id)
        {
            var entity = await _dbSet
                .Include(q => q.PredefinedAnswers).OrderBy(p => p.Priority)
                .FirstOrDefaultAsync(q => q.Id == id);
            return entity;
        }
    }
}
