using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionRepository : GenericRepository<QuestionDTO>, IQuestionRepository
    {

        public QuestionRepository(ApplicationContext dbContext) : base(dbContext)
        {}

        public async Task<IEnumerable<QuestionDTO>> GetEagerLoadingByQuestionGroupIdAsync(Guid questionGroupId)
        {
            var entities = await _dbSet.Where(s => s.QuestionGroupId == questionGroupId).OrderBy(s => s.Priority)
              .Include(q => q.PredefinedAnswers).OrderBy(p => p.Priority).ToListAsync();
            return entities;
        }

        public async Task<IEnumerable<QuestionDTO>> GetEagerLoadingBySurveyFormIdAsync(int surveyFormId)
        {
            var entities = await _dbSet.Where(s => s.SurveyFormId == surveyFormId).OrderBy(s => s.Priority)
             .Include(q => q.PredefinedAnswers).OrderBy(p => p.Priority).ToListAsync();
            return entities;
        }

        public async Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id)
        {
            var entity = await _dbSet
                .Include(q => q.PredefinedAnswers).OrderBy(p => p.Priority)
                .FirstOrDefaultAsync(q => q.Id == id);
            return entity;
        }
    }
}
