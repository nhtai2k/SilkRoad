using System.Share.ViewModels.LipstickClientViewModels;

namespace Member.BLL.IHelpers
{
    public interface IGenderHelper
    {
        public IEnumerable<GenderClientViewModel> GetAll(string language);
    }
}
