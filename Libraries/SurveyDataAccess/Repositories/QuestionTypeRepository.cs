using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionTypeRepository : GenericRepository<QuestionTypeDTO>, IQuestionTypeRepository
    {
        public QuestionTypeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
