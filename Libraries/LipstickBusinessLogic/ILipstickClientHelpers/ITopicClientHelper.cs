using System.Share.ViewModels.LipstickClientViewModels;
namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface ITopicClientHelper
    {
        public IEnumerable<TopicClientViewModel> GetTopicsInHomePage(string language);
        public IEnumerable<TopicClientViewModel> GetAllActive(string language);
    }
}
