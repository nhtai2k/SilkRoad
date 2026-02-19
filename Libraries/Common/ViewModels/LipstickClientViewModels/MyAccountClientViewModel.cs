using System.Share.Models;

namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class MyAccountClientViewModel
    {
        public Pagination<ProductClientViewModel>? FavoriteProducts { get; set; }
        public UserClientViewModel? UserInfor { get; set; }
        public ChangePasswordClientViewModel? ChangePassword { get; set; }

    }
}
