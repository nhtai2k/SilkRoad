using System.Share.Models;

namespace Lipstick.BLL.ILipstickClientHelpers
{
    public interface IWebhookHelper
    {
        public Task<bool> CreateAsync(SepayModel model);
    }
}
