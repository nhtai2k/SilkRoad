using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface IInforPageClientHelper
    {
        public InforPageClientViewModel? GetFirstDataByPageTypeId(int pageTypeId, string languge);
        //public IEnumerable<InforPageViewModel> GetByPageTypeId(int pageTypeId);

    }
}
