using System.Share.ViewModels.LipstickClientViewModels;

namespace Member.BLL.IHelpers
{
    public interface IRegisterHelper
    {
        public Task<bool> RegisterAsync(RegisterClientViewModel model);
        /// <summary>
        /// Return true if phone number is already registered
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        public Task<bool> CheckPhoneNumberAsync(string phoneNumber);
        /// <summary>
        /// Return true if email is already registered
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<bool> CheckEmailAsync(string email);
    }
}
