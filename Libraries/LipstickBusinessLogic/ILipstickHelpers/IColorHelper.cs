using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IColorHelper : IBaseHelper<ColorViewModel>
    {
        public Task<Pagination<ColorViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
