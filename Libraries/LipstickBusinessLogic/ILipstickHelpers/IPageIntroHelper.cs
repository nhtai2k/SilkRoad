using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IPageIntroHelper : IBaseHelper<PageIntroViewModel>
    {
        public Task<Pagination<PageIntroViewModel>> GetAllAsync(int pageTypeId, int pageIndex, int pageSize);
    }
}
