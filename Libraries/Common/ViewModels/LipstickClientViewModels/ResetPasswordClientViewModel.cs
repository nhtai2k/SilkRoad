namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class ResetPasswordClientViewModel
    {
        public required string PhoneNumber { get; set; }
        public required string Token { get; set; }
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
