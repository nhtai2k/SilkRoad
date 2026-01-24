using VOC.DAL.DTOs;

namespace VOC.DAL.IRepositories
{
    public interface IFeedbackRepository : IGenericRepository<FeedbackDTO, ApplicationContext>
    {
        public Task<FeedbackDTO> GetByCodeAsync(string code);
    }
}
