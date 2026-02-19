using System.Share.ViewModels.VOCViewModelModels;

namespace VOC.BLL.IHelpers
{
    public interface IDepartmentHelper : IBaseAsyncHelper<DepartmentViewModel>
    {
        public Task<IEnumerable<DepartmentViewModel>> GetAllActiveAsync();
    }
}
