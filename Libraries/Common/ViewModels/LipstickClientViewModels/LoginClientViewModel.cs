using System.ComponentModel.DataAnnotations;

namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class LoginClientViewModel
    {
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
        public string? ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }
}
