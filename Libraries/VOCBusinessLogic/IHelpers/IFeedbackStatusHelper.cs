using System.Share.ViewModels.VOCViewModelModels;
namespace VOC.BLL.IHelpers
{
    public interface IFeedbackStatusHelper
    {
        Task<IEnumerable<FeedbackStatusViewModel>> GetAllAsync();
        Task<FeedbackStatusViewModel> GetByIdAsync(int id);
        Task UpdateAsync(FeedbackStatusViewModel model);
    }
}
