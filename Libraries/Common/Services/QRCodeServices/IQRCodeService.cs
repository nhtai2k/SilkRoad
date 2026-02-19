using System.Share.ViewModels.QRViewModels;

namespace System.Share.Services.QRCodeServices
{
    public interface IQRCodeService
    {
        public Task<byte[]> Base64QRCodeImageAsync(QRCodeViewModel model);
        public Task<List<string>> GetAllFontsAsync();
    }
}
