using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IBrandHelper : IBaseHelper<BrandViewModel>
    {
        public Task<Pagination<BrandViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
