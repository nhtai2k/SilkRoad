using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<QuestionGroupLibraryDTO>> GetEagerLoadingAsync()
        {
            return await _dbSet.Where(x => !x.IsDeleted && x.IsActive).Include(x => x.QuestionLibraries).ToListAsync();
        }
    }
}
