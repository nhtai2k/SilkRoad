using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface ISizeHelper : IBaseHelper<SizeViewModel>
    {
        public Task<Pagination<SizeViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
