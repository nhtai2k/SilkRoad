using System.Share.ViewModels.VOCViewModelModels;

namespace VOC.BLL.IHelpers
{
    public interface IVOCUISettingHelper
    {
        public IEnumerable<ContentUIViewModel> GetAll(int vocTypeId);
        public VOCUIConfigurationViewModel GetAll();
        public ContentUIViewModel GetByKey(int vocTypeId, string key);
        public void Update(ContentUIViewModel model, int vocTypeId);
    }
}
