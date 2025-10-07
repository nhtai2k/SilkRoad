using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface ISurveyFormRepository : IGenericRepository<SurveyFormDTO>
    {
        //public Task<SurveyFormDTO?> GetEagerSurveyFormByIdAsync(int Id);
        //public SurveyFormDTO GetEagerActiveSurverFormByID(int ID);
        //public void RemoveSelectQuestionBySurveyFormID(int surveyFormID);
    }
}
