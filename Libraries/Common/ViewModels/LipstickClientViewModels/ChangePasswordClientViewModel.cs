using System.ComponentModel.DataAnnotations;

namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class ChangePasswordClientViewModel
    {
        [Required(ErrorMessage = "em_oldPassword")]
        public required string OldPassword { get; set; }
        [Required(ErrorMessage = "em_newPassword")]
        public required string NewPassword { get; set; }
        [Required(ErrorMessage = "em_confirmPassword")]
        [Compare("NewPassword", ErrorMessage = "passwordNotMatch")]
        public required string ConfirmPassword { get; set; }
    }
}
