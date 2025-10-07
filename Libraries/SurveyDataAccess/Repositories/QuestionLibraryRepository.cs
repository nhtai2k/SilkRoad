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
    public class QuestionLibraryRepository : GenericRepository<QuestionLibraryDTO>, IQuestionLibraryRepository
    {
        public QuestionLibraryRepository(ApplicationContext context) : base(context)
        {
        }
        public async Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id)
        {
            return await _dbSet.Where(s => s.Id == id)
                .Include(q => q.PredefinedAnswerLibraries.OrderBy(s => s.Priority))
                .FirstOrDefaultAsync();
        }
    }
}
