using Common.Models;
using Common.ViewModels.LipstickViewModels;

namespace LipstickBusinessLogic.ILipstickHelpers
{
    public interface IMemberHelper
    {
        public Pagination<MemberViewModel> GetAll(string? phoneNumber, string? email, int pageIndex, int pageSize);
    }
}
