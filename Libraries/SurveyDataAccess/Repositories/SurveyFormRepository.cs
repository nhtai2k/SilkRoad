using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class SurveyFormRepository : GenericRepository<SurveyFormDTO>, ISurveyFormRepository
    {

        public SurveyFormRepository(ApplicationContext dbContext) : base(dbContext)
        {

        }


        public async Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int id)
        {
            var data = await _dbSet
                .Where(s => s.Id == id)
                .Include(s => s.ParticipantInfoConfigs)
                //.Include(s => s.QuestionGroups)
                //    !.ThenInclude(qg => qg.Questions)
                //        .ThenInclude(q => q.QuestionType)
                .Include(s => s.QuestionGroups!.OrderBy(p => p.Priority))
                    !.ThenInclude(qg => qg.Questions!.OrderBy(p => p.Priority))
                        .ThenInclude(q => q.PredefinedAnswers!.OrderBy(p => p.Priority))
                //.Include(s => s.Questions)
                //    !.ThenInclude(q => q.QuestionType)
                .Include(s => s.Questions!.OrderBy(p => p.Priority))
                    !.ThenInclude(q => q.PredefinedAnswers!.OrderBy(p => p.Priority))
                .AsSplitQuery() // prevents Cartesian explosion when multiple collections are included
                .AsNoTracking()
                .FirstOrDefaultAsync();

            return data;
        }
        //public void RemoveSelectQuestionBySurveyFormID(int surveyFormID)
        //{
        //    //List<SelectedQuestionDTO> selectQuestions = _surveyQuestion.Where(s => s.SurveyFormId == surveyFormID).ToList();
        //    //selectQuestions.ForEach(s =>
        //    //{
        //    //    _surveyQuestion.Remove(s);
        //    //});
        //    throw new NotImplementedException();

        //}
        //public SurveyFormDTO? GetEagerSurveyFormByID(int ID)
        //{
        //    //var data = _surveyForms.Where(s => s.Id == ID).Include(s => s.SurveyQuestions).FirstOrDefault();
        //    //return data;
        //    throw new NotImplementedException();

        //}
        //public SurveyFormDTO GetEagerActiveSurverFormByID(int ID)
        //{
        //    //SurveyFormDTO surveyForm = _surveyForms.Where(s => s.Id == ID && s.IsActive && s.StartDate.Date <= DateTime.Now.Date && s.EndDate.Date >= DateTime.Now.Date).FirstOrDefault();
        //    //if (surveyForm != null)
        //    //{
        //    //    surveyForm.SurveyQuestions = _surveyQuestion.Where(s => s.SurveyFormId == surveyForm.Id).ToList();
        //    //    return surveyForm;
        //    //}
        //    //return null;
        //    throw new NotImplementedException();

        //}

    }
}
