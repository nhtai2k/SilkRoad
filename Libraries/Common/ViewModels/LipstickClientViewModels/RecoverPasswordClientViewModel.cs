using System.Share.Custom.CustomDataAnnotations;

namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class RecoverPasswordClientViewModel
    {
        [PhoneNumberValidation]
        public required string PhoneNumber { get; set; }
    }
}
