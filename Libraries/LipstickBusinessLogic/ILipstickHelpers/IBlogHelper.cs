using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IBlogHelper : IBaseHelper<BlogViewModel>
    {
        public Task<Pagination<BlogViewModel>> GetAllAsync(int pageIndex, int pageSize, int topicId);
        public IEnumerable<BlogViewModel> GetByTopicId(int topicId);
    }
}
