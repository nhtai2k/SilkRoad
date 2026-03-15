using System.Share.Models;

namespace System.BLL.IHelpers.ISystemHelpers
{
    public interface INavigationHelper
    {
        public ICollection<NavigationModel>? GetAll();
        public NavigationModel? GetByName(string name);
        public bool Update(NavigationModel model);
    }
}
