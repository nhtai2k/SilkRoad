using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IProductHelper : IBaseAsyncHelper<ProductViewModel>
    {
        public Task<Pagination<ProductViewModel>> GetByFilterAsync(ProductFilterModel filter);
        public Task<List<ProductViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
    }
}
