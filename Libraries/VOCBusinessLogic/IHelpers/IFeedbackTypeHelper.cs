using System.Share.ViewModels.VOCClientViewModels;
using System.Share.ViewModels.VOCViewModelModels;

namespace VOC.BLL.IHelpers
{
    public interface IFeedbackTypeHelper : IBaseAsyncHelper<FeedbackTypeViewModel>
    {
        public Task<IEnumerable<FeedbackTypeViewModel>> GetAllActiveAsync(int typeId);
        public Task<IEnumerable<FeedbackTypeViewModel>> GetAllAsync(int typeId);
        public Task<IEnumerable<FeedbackTypeClientViewModel>> GetAllAsync(string language, int typeId);
    }
}
