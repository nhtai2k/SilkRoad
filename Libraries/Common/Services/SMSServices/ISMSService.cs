namespace System.Share.Services.SMSServices
{
    public interface ISMSService
    {
        public Task<bool> SendSMSAsync(string phoneNumber, string message);
    }
}
