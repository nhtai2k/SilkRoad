using VOC.DAL.DTOs;

namespace VOC.DAL.IRepositories
{
    public interface IFeedbackPriorityRepository : IGenericRepository<FeedbackPriorityDTO, ApplicationContext>
    {
        public Task<FeedbackPriorityDTO?> GetTheFirstAsync();

    }
}
