using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class UserClientViewModel
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required(ErrorMessage = "em_phoneNumber")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "em_email")]
        public string Email { get; set; }
        public int GenderId { get; set; }
        public DateTime? Birthday { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public string? Address { get; set; }

    }
}
