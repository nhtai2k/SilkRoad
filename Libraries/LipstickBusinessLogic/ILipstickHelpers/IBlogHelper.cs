using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IBlogHelper : IBaseHelper<BlogViewModel>
    {
        public Task<Pagination<BlogViewModel>> GetAllAsync(int pageIndex, int pageSize, int topicId);
        public IEnumerable<BlogViewModel> GetByTopicId(int topicId);
    }
}
