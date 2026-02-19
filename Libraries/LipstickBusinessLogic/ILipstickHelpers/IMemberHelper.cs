using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.ILipstickHelpers
{
    public interface IMemberHelper
    {
        public Pagination<MemberViewModel> GetAll(string? phoneNumber, string? email, int pageIndex, int pageSize);
    }
}
