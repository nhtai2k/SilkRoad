using Microsoft.AspNetCore.Http;

namespace System.Share.Services.ConvertWordToPdfServices
{
    public interface IConvertWordToPdfService
    {
        public Task<byte[]?> ConvertWordToPdfAsync(IFormFile file);
    }
}
