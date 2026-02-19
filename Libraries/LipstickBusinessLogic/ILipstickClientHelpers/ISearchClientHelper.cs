using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface ISearchClientHelper
    {
        public Task<List<ProductClientViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
        public Task<Pagination<ProductClientViewModel>> GetProductSearchResultAsync(string language, string searchText, int pageIndex, int pageSize);
    }
}
