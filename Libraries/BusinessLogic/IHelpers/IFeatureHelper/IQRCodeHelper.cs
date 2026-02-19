using System.Share.ViewModels.QRViewModels;

namespace System.BLL.IHelpers.IFeatureHelper
{
    public interface IQRCodeHelper
    {
        public Task<List<string>> GetAllFontsAsync();
        public Task<byte[]> GenerateQRCodeAsync(QRCodeViewModel model);
        public Task<string> GenerateListQRCodeAsync(QRCodeListViewModel model);
    }
}
