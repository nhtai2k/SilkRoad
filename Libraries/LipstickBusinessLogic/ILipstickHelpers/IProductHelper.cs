using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IProductHelper : IBaseAsyncHelper<ProductViewModel>
    {
        public Task<Pagination<ProductViewModel>> GetByFilterAsync(ProductFilterModel filter);
        public Task<List<ProductViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
    }
}
