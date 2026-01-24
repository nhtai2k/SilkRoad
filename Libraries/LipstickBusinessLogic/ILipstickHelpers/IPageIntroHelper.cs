using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IPageIntroHelper : IBaseHelper<PageIntroViewModel>
    {
        public Task<Pagination<PageIntroViewModel>> GetAllAsync(int pageTypeId, int pageIndex, int pageSize);
    }
}
