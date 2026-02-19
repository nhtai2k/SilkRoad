using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
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
