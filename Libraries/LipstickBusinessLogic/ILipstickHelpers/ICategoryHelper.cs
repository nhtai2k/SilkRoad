using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface ICategoryHelper : IBaseHelper<CategoryViewModel>
    {
        public Task<Pagination<CategoryViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
