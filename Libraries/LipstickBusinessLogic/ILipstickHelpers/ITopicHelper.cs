using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;
namespace Lipstick.BLL.ILipstickHelpers
{
    public interface ITopicHelper : IBaseHelper<TopicViewModel>
    {
        public Task<Pagination<TopicViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
