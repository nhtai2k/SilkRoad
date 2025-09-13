using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class MyAccountClientViewModel
    {
        public Pagination<ProductClientViewModel>? FavoriteProducts { get; set; }
        public UserClientViewModel? UserInfor { get; set; }
        public ChangePasswordClientViewModel? ChangePassword { get; set; }

    }
}
