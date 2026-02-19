using VOC.DAL.DTOs;

namespace VOC.DAL.IRepositories
{
    public interface IFeedbackStatusRepository : IGenericRepository<FeedbackStatusDTO, ApplicationContext>
    {
        public Task<FeedbackStatusDTO?> GetTheFirstAsync();
    }
}
