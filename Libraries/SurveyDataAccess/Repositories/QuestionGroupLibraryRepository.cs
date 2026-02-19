using Microsoft.EntityFrameworkCore;
using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class QuestionGroupLibraryRepository : GenericRepository<QuestionGroupLibraryDTO>, IQuestionGroupLibraryRepository
    {
        public QuestionGroupLibraryRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<QuestionGroupLibraryDTO>> GetEagerLoadingAsync()
        {
            return await _dbSet.Where(x => !x.IsDeleted && x.IsActive).OrderBy(s => s.Priority)
                .Include(x => x.QuestionLibraries).OrderBy(s => s.Priority).ToListAsync();
        }
    }
}
