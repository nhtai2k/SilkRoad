using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IProductHelper : IBaseAsyncHelper<ProductViewModel>
    {
        public Task<Pagination<ProductViewModel>> GetAllAsync(string? nameVN, string? nameEN, int categoryId, int subCategoryId,
            int brandId, int sizeId, int colorId, int pageIndex, int pageSize);
        public Task<List<ProductViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
    }
}
