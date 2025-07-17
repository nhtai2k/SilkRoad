using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
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
