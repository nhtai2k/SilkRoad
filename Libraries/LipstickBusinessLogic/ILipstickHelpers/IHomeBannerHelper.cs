using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IHomeBannerHelper : IBaseHelper<HomeBannerViewModel>
    {
        public IEnumerable<HomeBannerViewModel> GetByBannerTypeId(int bannerTypeId);
        public Task<Pagination<HomeBannerViewModel>> GetAllAsync(int pageIndex, int pageSize, int bannerTypeId);
    }
}
