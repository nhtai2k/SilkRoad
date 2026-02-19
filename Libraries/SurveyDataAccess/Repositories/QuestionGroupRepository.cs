using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class QuestionGroupRepository : GenericRepository<QuestionGroupDTO>, IQuestionGroupRepository
    {

        public QuestionGroupRepository(ApplicationContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<QuestionGroupDTO>?> GetEagerLoadingBySurveyFormIdAsync(int surveyFormId)
        {
            return await _dbSet
                .Where(s => s.SurveyFormId == surveyFormId)
                .OrderBy(s => s.Priority)
                .Include(p => p.Questions.OrderBy(s => s.Priority))
                .ThenInclude(x => x.PredefinedAnswers.OrderBy(s => s.Priority))
                .ToListAsync();
        }
        //public IEnumerable<QuestionGroupLibraryDTO> GetEagerAllElements()
        //{
        //    //var data = _questionGroups.Include(s => s.QuestionLibraries.Where(p => !p.IsDeleted)).ToList();
        //    //return data;
        //    throw new NotImplementedException();

        //}
        //public QuestionGroupLibraryDTO? GetEagerQuestionGroupById(int id)
        //{
        //    //var data = _questionGroups.Where(s => s.Id == id).Include(s => s.QuestionLibraries).ThenInclude(s => s.PredefinedAnswerLibraries).FirstOrDefault();
        //    //return data;
        //    throw new NotImplementedException();

        //}
    }
}
