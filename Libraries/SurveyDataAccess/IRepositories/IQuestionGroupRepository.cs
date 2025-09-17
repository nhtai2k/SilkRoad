using SurveyDataAccess.DTOs;
namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionGroupRepository : IGenericRepository<QuestionGroupDTO>
    {
        //public IEnumerable<QuestionGroupLibraryDTO> GetEagerAllElements();
        //public QuestionGroupLibraryDTO? GetEagerQuestionGroupById(int id);
    }
}
