using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IParticipantRepository : IGenericRepository<ParticipantDTO>
    {
        //public bool CheckExistenceBySurveyFormID(int surveyFormID);
        //public ParticipantDTO? GetEagerParticipantById(int id);
        public Task<bool> HasAnyParticipantsAsync(int surveyFormId);
        public Task<int> CountParticipantsAsync(int surveyFormId);
    }
}
