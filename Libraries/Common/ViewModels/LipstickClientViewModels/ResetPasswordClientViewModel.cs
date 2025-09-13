using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class ResetPasswordClientViewModel
    {
        public required string PhoneNumber { get; set; }
        public required string Token { get; set; }
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
