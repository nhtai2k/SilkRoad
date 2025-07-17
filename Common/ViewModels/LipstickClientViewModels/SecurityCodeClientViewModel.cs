using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class SecurityCodeClientViewModel
    {
        [Required]
        public required string PhoneNumber { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
