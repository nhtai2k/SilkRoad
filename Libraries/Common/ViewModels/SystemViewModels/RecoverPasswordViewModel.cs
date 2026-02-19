using System.ComponentModel.DataAnnotations;
using System.Share.Custom.CustomDataAnnotations;

namespace System.Share.ViewModels.SystemViewModels
{
    public class RecoverPasswordViewModel
    {
        [EmailValidation]
        [Required(ErrorMessage = "Email is required!")]
        public required string Email { get; set; }
    }
}
