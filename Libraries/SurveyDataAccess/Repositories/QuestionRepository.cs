using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionRepository : GenericRepository<QuestionDTO>, IQuestionRepository
    {

        public QuestionRepository(ApplicationContext dbContext) : base(dbContext)
        {

        }

    }
}
