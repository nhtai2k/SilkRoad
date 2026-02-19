using Microsoft.AspNetCore.Identity;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Member.BLL.IHelpers
{
    public interface IMyAccountHelper
    {
        public Task<bool> UpdateAsync(UserClientViewModel model);
        public Task<IdentityResult> ChangePasswordAsync(int userId, ChangePasswordClientViewModel model);
        public Task<UserClientViewModel?> GetUserByIdAsync(int Id);
        public UserClientViewModel? GetUserById(int Id);
    }
}
