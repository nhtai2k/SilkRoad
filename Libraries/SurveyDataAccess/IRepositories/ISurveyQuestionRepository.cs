namespace SurveyDataAccess.IRepositories
{
    public interface ISurveyQuestionRepository : IGenericRepository<SelectedQuestionDTO, ApplicationContext>
    {
        public bool CheckExistenceByQuestionID(int questionID);
        public bool CheckExistenceByQuestionGroupID(int questionGroupID);
        public Task<IEnumerable<SelectedQuestionDTO>> GetBySurveyFormID(int surveyFormId);

    }
}
