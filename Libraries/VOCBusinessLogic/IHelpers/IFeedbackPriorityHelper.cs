using System.Share.ViewModels.VOCViewModelModels;

namespace VOC.BLL.IHelpers
{
    public interface IFeedbackPriorityHelper
    {
        Task<IEnumerable<FeedbackPriorityViewModel>> GetAllAsync();
        Task<FeedbackPriorityViewModel> GetByIdAsync(int id);
        Task UpdateAsync(FeedbackPriorityViewModel model);
    }
}
