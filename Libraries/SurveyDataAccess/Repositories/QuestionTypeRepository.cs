using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class QuestionTypeRepository : GenericRepository<QuestionTypeDTO>, IQuestionTypeRepository
    {
        public QuestionTypeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
