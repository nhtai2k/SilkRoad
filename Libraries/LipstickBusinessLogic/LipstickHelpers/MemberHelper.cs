using AutoMapper;
using Lipstick.BLL.ILipstickHelpers;
using LipstickDataAccess.MemberContext;
using System.Share.Models;
using System.Share.ViewModels.LipstickViewModels;

namespace Lipstick.BLL.LipstickHelpers
{
    public class Memberhelper : IMemberHelper
    {
        private readonly LipstickMemberDatabaseContext _context;
        private readonly IMapper _mapper;
        public Memberhelper(LipstickMemberDatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Pagination<MemberViewModel> GetAll(string? phoneNumber, string? email, int pageIndex, int pageSize)
        {
            // Initialize the pagination model
            Pagination<MemberViewModel> model = new Pagination<MemberViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;
            var member = _context.TableUsers.Where(s =>
                !s.IsDeleted &&
                (phoneNumber == null ? true : s.PhoneNumber.Contains(phoneNumber)) &&
                (email == null ? true : s.Email.Contains(email))
            );

            // Paginate the query
            var data = member.ToList().Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize);

            // Calculate total items and pages
            model.TotalItems = member.Count();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = _mapper.Map<IEnumerable<MemberViewModel>>(data);
            // Return the paginated result
            return model;
        }
    }
}
