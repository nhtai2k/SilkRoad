using System.BLL.IHelpers.IFeatureHelper;
using System.Share.Models;
using System.Share.Services.EMailServices;

namespace System.BLL.Helpers.FeatureHelpers
{
    public class EmailHelper : IEmailHelper
    {
        private IMailService _mailService;
        public EmailHelper(IMailService mailService)
        {
            _mailService = mailService;
        }
        public async Task<bool> SendSingleEmail(SingleMailData mailData)
        {
            bool result = await _mailService.SendSingleEmailAsync(mailData, new CancellationToken());
            if (!result)
            {
                return false;
            }
            return true;
        }
        public async Task<bool> SendMailAsync(MailData mailData)
        {
            bool result = await _mailService.SendAsync(mailData, new CancellationToken());
            if (!result)
            {
                return false;
            }
            return true;
        }
        public async Task<bool> SendMailWithAttachments(MailDataWithAttachments mailDataWithAttachments)
        {
            bool result = await _mailService.SendWithAttachmentsAsync(mailDataWithAttachments, new CancellationToken());
            if (!result)
            {
                return false;
            }
            return true;
        }
    }
}
