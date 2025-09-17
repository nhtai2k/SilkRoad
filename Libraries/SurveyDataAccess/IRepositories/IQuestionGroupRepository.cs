using SurveyDataAccess.DTOs;
namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionGroupRepository : IGenericRepository<QuestionGroupLibraryDTO, ApplicationContext>
    {
        public IEnumerable<QuestionGroupLibraryDTO> GetEagerAllElements();
        public QuestionGroupLibraryDTO? GetEagerQuestionGroupById(int id);
    }
}
