using Common.ViewModels.LipstickClientViewModels;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface IPageIntroClientHelper
    {
        PageIntroClientViewModel? GetPageIntroClientByPageTypeId(string langage, int pageTypeId);
    }
}
