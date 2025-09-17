//using Microsoft.EntityFrameworkCore;
//using SurveyDataAccess.IRepositories;

//namespace SurveyDataAccess.Repositories
//{
//    public class SurveyQuestionRepository : GenericRepository<SelectedQuestionDTO, ApplicationContext>, ISurveyQuestionRepository
//    {
//        private readonly DbSet<SelectedQuestionDTO> _surveyQuestion;
//        public SurveyQuestionRepository(ApplicationContext dbContext) : base(dbContext)
//        {
//            _surveyQuestion = dbContext.Set<SelectedQuestionDTO>();
//        }
//        public bool CheckExistenceByQuestionID(int questionID)
//        {
//            return _surveyQuestion.Any(s => s.QuestionId == questionID);
//        }
//        public bool CheckExistenceByQuestionGroupID(int questionGroupID)
//        {
//            return _surveyQuestion.Any(s => s.QuestionGroupId == questionGroupID);

//        }

//        public async Task<IEnumerable<SelectedQuestionDTO>> GetBySurveyFormID(int surveyFormId)
//        {
//            return await _surveyQuestion.Where(s => s.SurveyFormId == surveyFormId).ToListAsync();
//        }
//    }
//}
