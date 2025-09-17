using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionRepository : IGenericRepository<QuestionLibraryDTO, ApplicationContext>
    {
        public QuestionLibraryDTO? GetEagerQuestionById(int id);
        public bool CheckExistenceByQuestionGroupId(int questionGroupId);
    }
}
