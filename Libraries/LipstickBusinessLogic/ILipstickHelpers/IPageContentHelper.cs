using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IPageContentHelper : IBaseHelper<PageContentViewModel>
    {
        public IEnumerable<PageContentViewModel> GetByPageTypeId(int pageTypeId);
        public Task<Pagination<PageContentViewModel>> GetAllAsync(int pageIndex, int pageSize);
    }
}
