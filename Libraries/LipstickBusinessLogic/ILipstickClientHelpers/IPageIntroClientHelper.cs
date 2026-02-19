using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface IPageIntroClientHelper
    {
        PageIntroClientViewModel? GetPageIntroClientByPageTypeId(string langage, int pageTypeId);
    }
}
