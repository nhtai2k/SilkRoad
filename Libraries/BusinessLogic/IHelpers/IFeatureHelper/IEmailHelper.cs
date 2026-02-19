using System.Share.Models;

namespace System.BLL.IHelpers.IFeatureHelper
{
    public interface IEmailHelper
    {
        public Task<bool> SendSingleEmail(SingleMailData mailData);
        public Task<bool> SendMailAsync(MailData mailData);
        public Task<bool> SendMailWithAttachments(MailDataWithAttachments mailDataWithAttachments);
    }
}
