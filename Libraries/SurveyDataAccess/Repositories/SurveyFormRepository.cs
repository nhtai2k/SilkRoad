using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class SurveyFormRepository : GenericRepository<SurveyFormDTO>, ISurveyFormRepository
    {

        public SurveyFormRepository(ApplicationContext dbContext) : base(dbContext)
        {

        }


        public async Task<SurveyFormDTO?> GetEagerSurveyFormByIdAsync(int id)
        {
            var data = await _dbSet
                .Where(s => s.Id == id)
                .Include(s => s.ParticipantInfoConfigs)
                .Include(s => s.QuestionGroups)
                    !.ThenInclude(qg => qg.Questions)
                        .ThenInclude(q => q.QuestionType)
                .Include(s => s.QuestionGroups)
                    !.ThenInclude(qg => qg.Questions)
                        .ThenInclude(q => q.PredefinedAnswers)
                .Include(s => s.Questions)
                    !.ThenInclude(q => q.QuestionType)
                .Include(s => s.Questions)
                    !.ThenInclude(q => q.PredefinedAnswers)
                .AsSplitQuery() // prevents Cartesian explosion when multiple collections are included
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
