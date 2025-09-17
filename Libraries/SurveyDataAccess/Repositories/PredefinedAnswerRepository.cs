using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class PredefinedAnswerRepository : GenericRepository<PredefinedAnswerLibraryDTO, ApplicationContext>, IPredefinedAnswerRepository
    {
        public PredefinedAnswerRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
