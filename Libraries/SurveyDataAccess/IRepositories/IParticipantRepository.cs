using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IParticipantRepository : IGenericRepository<ParticipantDTO>
    {
        public Task<ParticipantDTO?> GetEagerLoadingByIdAsync(Guid id);
        public Task<bool> HasAnyParticipantsAsync(int surveyFormId);
        public Task<int> CountParticipantsAsync(int surveyFormId);
    }
}
