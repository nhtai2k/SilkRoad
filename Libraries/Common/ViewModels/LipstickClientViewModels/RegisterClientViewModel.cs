using System.ComponentModel.DataAnnotations;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class RegisterClientViewModel
    {
        [Required]
        [Length(2,255)]
        public required string FullName { get; set; }
        [Required]
        [MaxLength(10)]
        public required string PhoneNumber { get; set; }
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }
        [Required]
        [Length(6,12)]
        public required string Password { get; set; }
        [Compare("Password")]
        public required string ConfirmPassword { get; set; }
    }
}
