using System.Share.ViewModels.LipstickClientViewModels;
namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface IHomeBannerClientHelper
    {
        public IEnumerable<HomeBannerClientViewModel> GetAllActive(string language);
    }
}
