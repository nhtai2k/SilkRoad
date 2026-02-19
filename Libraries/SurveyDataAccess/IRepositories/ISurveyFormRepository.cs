using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface ISurveyFormRepository : IGenericRepository<SurveyFormDTO>
    {
        public Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int Id);
        //public SurveyFormDTO GetEagerActiveSurverFormByID(int ID);
        //public void RemoveSelectQuestionBySurveyFormID(int surveyFormID);
    }
}
