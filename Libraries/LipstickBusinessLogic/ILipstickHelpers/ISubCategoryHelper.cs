using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface ISubCategoryHelper : IBaseHelper<SubCategoryViewModel>
    {
        public Task<Pagination<SubCategoryViewModel>> GetAllAsync(int pageIndex, int pageSize, int categoryId);
        public IEnumerable<SubCategoryViewModel> GetByCategoryId(int categoryId);
    }
}
