using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyDataAccess.Repositories
{
    public class QuestionGroupLibraryRepository : GenericRepository<QuestionGroupLibraryDTO>, IQuestionGroupLibraryRepository
    {
        public QuestionGroupLibraryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
