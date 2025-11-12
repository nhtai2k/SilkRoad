using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
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

        public async Task<bool> HasAnyParticipantsAsync(int surveyFormId)
        {
            return await _dbSet.AnyAsync(s => s.SurveyFormId == surveyFormId);
        }

        //public ParticipantDTO? GetEagerParticipantById(int id)
        //{
        //    //var data = _participant.Where(s => s.Id == id).Include(s => s.Answers).FirstOrDefault();
        //    //return data;
        //    throw new NotImplementedException();
        //}

    }
}
