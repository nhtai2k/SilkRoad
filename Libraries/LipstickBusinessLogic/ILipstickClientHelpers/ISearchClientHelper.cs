using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface ISearchClientHelper
    {
        public Task<List<ProductClientViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
        public Task<Pagination<ProductClientViewModel>> GetProductSearchResultAsync(string language, string searchText, int pageIndex, int pageSize);
    }
}
