using VOC.DAL.DTOs;
using VOC.DAL.IRepositories;

namespace VOC.DAL.Repositories
{
    public class ForwardFeedbackRepository : GenericRepository<ForwardFeedbackDTO, ApplicationContext>, IForwardFeedbackRepository
    {
        public ForwardFeedbackRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
