using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionRepository : GenericRepository<QuestionLibraryDTO, ApplicationContext>, IQuestionRepository
    {
        private readonly DbSet<QuestionLibraryDTO> _questions;
        public QuestionRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _questions = dbContext.Set<QuestionLibraryDTO>();
        }



        public QuestionLibraryDTO? GetEagerQuestionById(int id)
        {
            var question = _questions.Where(s => s.Id == id).Include(s => s.PredefinedAnswerLibraries).FirstOrDefault();
            return question;
        }
        public bool CheckExistenceByQuestionGroupId(int questionGroupId)
        {
            return _questions.Any(s => s.QuestionGroupId == questionGroupId);
        }

    }
}
