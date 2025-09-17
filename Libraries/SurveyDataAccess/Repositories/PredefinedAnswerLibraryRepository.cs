using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyDataAccess.Repositories
{
    public class PredefinedAnswerLibraryRepository : GenericRepository<PredefinedAnswerLibraryDTO>, IPredefinedAnswerLibraryRepository
    {
        public PredefinedAnswerLibraryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
