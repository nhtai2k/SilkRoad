using System.Share.ViewModels.SystemViewModels;

namespace System.BLL.IHelpers.ISystemHelpers
{
    public interface ISettingHelper
    {
        public IEnumerable<SettingViewModel> GetAll();
        public SettingViewModel GetByKey(string key);
        public void Update(SettingViewModel model);
    }
}
