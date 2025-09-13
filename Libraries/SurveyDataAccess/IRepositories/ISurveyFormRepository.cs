using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface ISurveyFormRepository : IGenericRepository<SurveyFormDTO, ApplicationContext>
    {
        public SurveyFormDTO GetEagerActiveSurverFormByID(int ID);
        public SurveyFormDTO? GetEagerSurveyFormByID(int ID);
        public void RemoveSelectQuestionBySurveyFormID(int surveyFormID);
    }
}
