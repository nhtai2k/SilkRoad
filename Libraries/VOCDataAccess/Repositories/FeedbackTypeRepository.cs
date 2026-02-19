using VOC.DAL.DTOs;
using VOC.DAL.IRepositories;

namespace VOC.DAL.Repositories
{
    public class FeedbackTypeRepository : GenericRepository<FeedbackTypeDTO, ApplicationContext>, IFeedbackTypeRepository
    {
        public FeedbackTypeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
