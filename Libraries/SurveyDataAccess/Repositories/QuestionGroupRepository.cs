using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionGroupRepository : GenericRepository<QuestionGroupDTO>, IQuestionGroupRepository
    {

        public QuestionGroupRepository(ApplicationContext dbContext) : base(dbContext)
        {
            
        }
        public IEnumerable<QuestionGroupLibraryDTO> GetEagerAllElements()
        {
            //var data = _questionGroups.Include(s => s.QuestionLibraries.Where(p => !p.IsDeleted)).ToList();
            //return data;
            throw new NotImplementedException();

        }
        public QuestionGroupLibraryDTO? GetEagerQuestionGroupById(int id)
        {
            //var data = _questionGroups.Where(s => s.Id == id).Include(s => s.QuestionLibraries).ThenInclude(s => s.PredefinedAnswerLibraries).FirstOrDefault();
            //return data;
            throw new NotImplementedException();

        }
    }
}
