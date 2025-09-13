using Common.Custom.CustomDataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class RecoverPasswordClientViewModel
    {
        [PhoneNumberValidation]
        public required string PhoneNumber { get; set; }
    }
}
