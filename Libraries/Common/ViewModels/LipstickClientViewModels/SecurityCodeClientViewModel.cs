using System.ComponentModel.DataAnnotations;

namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class SecurityCodeClientViewModel
    {
        [Required]
        public required string PhoneNumber { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
