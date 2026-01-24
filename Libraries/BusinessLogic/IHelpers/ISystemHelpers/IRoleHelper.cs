using System.Share.Models;
using System.Share.ViewModels.SystemViewModels;

namespace System.BLL.IHelpers.ISystemHelpers
{
    public interface IRoleHelper : IBaseAsyncHelper<RoleViewModel>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        Task<IEnumerable<RoleViewModel>> GetAllActiveAsync();
        Task<RoleViewModel> GetEagerRoleByIdAsync(int id);
    }
}
