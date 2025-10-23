using Common.Models;
using Common.ViewModels.SystemViewModels;

namespace BusinessLogic.IHelpers.ISystemHelpers
{
    public interface IRoleHelper : IBaseAsyncHelper<RoleViewModel>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        Task<IEnumerable<RoleViewModel>> GetAllActiveAsync();
        Task<RoleViewModel> GetEagerRoleByIdAsync(int id);
    }
}
