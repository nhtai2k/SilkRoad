using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class ParticipantRepository : GenericRepository<ParticipantDTO>, IParticipantRepository
    {
        public ParticipantRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> CountParticipantsAsync(int surveyFormId)
        {
            return await _dbSet.CountAsync(s => s.SurveyFormId == surveyFormId);
        }

        public async Task<ParticipantDTO?> GetEagerLoadingByIdAsync(Guid id)
        {
            return await _dbSet.Where(s => s.Id == id)
                .Include(s => s.ParticipantInfos)
                .Include(s => s.Answers)
                .AsNoTracking()
                .FirstOrDefaultAsync();
        }

        public async Task<bool> HasAnyParticipantsAsync(int surveyFormId)
        {
            return await _dbSet.AnyAsync(s => s.SurveyFormId == surveyFormId);
        }
    }
}
