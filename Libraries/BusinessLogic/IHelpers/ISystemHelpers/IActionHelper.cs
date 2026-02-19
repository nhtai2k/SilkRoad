using System.Share.Models;
using System.Share.ViewModels.SystemViewModels;

namespace System.BLL.IHelpers.ISystemHelpers
{
    public interface IActionHelper
    {
        public Task<Pagination<ActionViewModel>> GetAllAsync(int pageIndex, int pageSize);
        public Task<IEnumerable<ActionViewModel>> GetAllActiveAsync();
        public Task<List<string>> GetEActionsAsync();
        public Task<ActionViewModel> GetByIdAsync(int id);
        public Task<bool> CreateAsync(ActionViewModel model);
        public Task<bool> UpdateAsync(ActionViewModel model);
    }
}
