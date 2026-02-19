using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface ICategoryClientHelper
    {
        public IEnumerable<CategoryClientViewModel> GetNavigationBar(string language);
        public IEnumerable<CategoryClientViewModel> GetMenu(string language);
    }
}
