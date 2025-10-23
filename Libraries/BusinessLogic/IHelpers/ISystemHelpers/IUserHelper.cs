using Common.Models;
using Common.ViewModels.SystemViewModels;

namespace BusinessLogic.IHelpers.ISystemHelpers
{
    public interface IUserHelper : IBaseAsyncHelper<UserViewModel>
    {
        //public Task<IEnumerable<UserViewModel>> GetAllAsync(int mallId);
        public Task<Pagination<UserViewModel>> GetAllAsync(int pageIndex, int pageSize, int roleId, string textSearch);
        public Task<bool> DeactivateUserAsync(int Id, string? userName);
        public Task<bool> ActivateUserAsync(int Id, string? userName);
    }
}
