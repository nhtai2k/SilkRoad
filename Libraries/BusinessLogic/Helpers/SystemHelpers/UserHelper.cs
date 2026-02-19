using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.BLL.IHelpers.ISystemHelpers;
using System.DAL;
using System.DAL.DTOs;
using System.Share.Models;
using System.Share.Services.JwtServices;
using System.Share.ViewModels.SystemViewModels;

namespace System.BLL.Helpers.SystemHelpers
{
    public class UserHelper : IUserHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<UserDTO> _userManager;
        private readonly RoleManager<RoleDTO> _roleManager;
        private readonly IJwtService _jwtService;
        //private readonly UserInformation _userInformation;
        //private readonly IUserLogHelper _userLogHelper;
        public UserHelper(IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<UserDTO> userManager,
            RoleManager<RoleDTO> roleManager,
            IJwtService jwtService
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
        }

        public async Task<IEnumerable<UserViewModel>> GetAllAsync()
        {
            IEnumerable<UserDTO> data = await _unitOfWork.UserSystemRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserViewModel>>(data);
        }
        public async Task<Pagination<UserViewModel>> GetAllAsync(int pageIndex, int pageSize, int roleId, string textSearch)
        {
            Pagination<UserViewModel> result = new Pagination<UserViewModel>();
            if (pageSize < 0)
                pageSize = result.PageSize;
            // Query only necessary data with pagination at the database level
            var query = _unitOfWork.UserSystemRepository.Query(includeProperties: "UserRoles");
            if (roleId != -1)
            {
                query = query.Where(s => s.UserRoles.Any(r => r.RoleId == roleId));
            }
            if (!string.IsNullOrEmpty(textSearch))
            {
                query = query.Where(x => (x.PhoneNumber != null && x.PhoneNumber.Contains(textSearch))
                    || (x.Email != null && x.Email.Contains(textSearch))
                    || (x.UserName != null && x.UserName.Contains(textSearch)));
            }
            result.PageIndex = pageIndex;
            result.TotalItems = await query.CountAsync();
            result.TotalPages = (int)Math.Ceiling(result.TotalPages / (double)pageSize);

            var data = await query
                .OrderBy(s => s.Id)  // Ensure ordering for consistent pagination
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(); // Fetch only the required data

            result.Items = data.Select(s => new UserViewModel
            {
                Id = s.Id,
                UserName = s.UserName ?? string.Empty, // Fix CS8601: Ensure non-null assignment
                Email = s.Email ?? string.Empty,       // Defensive: Email is required, ensure non-null
                Password = "********", // Masking the password
                PhoneNumber = s.PhoneNumber,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                ModifiedBy = s.ModifiedBy
            }).ToList();

            return result;
        }

        public async Task<Pagination<UserViewModel>> GetAllAsync(int pageIndex, int pageSize)
        {
            Pagination<UserViewModel> result = new Pagination<UserViewModel>();
            if (pageSize < 0)
                pageSize = result.PageSize;
            // Query only necessary data with pagination at the database level
            var query = _unitOfWork.UserSystemRepository.Query(s => s.IsActive);
            result.PageIndex = pageIndex;
            result.TotalItems = await query.CountAsync();
            result.TotalPages = (int)Math.Ceiling(result.TotalPages / (double)pageSize);

            var data = await query
                .OrderBy(s => s.Id)  // Ensure ordering for consistent pagination
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(); // Fetch only the required data

            result.Items = _mapper.Map<List<UserViewModel>>(data);

            return result;
        }
        public async Task<UserViewModel> GetByIdAsync(int ID)
        {
            var data = await _unitOfWork.UserSystemRepository.GetByIdAsync(ID);
            if (data == null)
            {
                return null;
            }
            UserViewModel UserSystemViewModel = _mapper.Map<UserViewModel>(data);
            return UserSystemViewModel;
        }
        public async Task<bool> CreateAsync(UserViewModel model)
        {
            UserDTO account = _mapper.Map<UserDTO>(model);
            //account.CreatedBy = _userInformation.GetUserName();
            account.CreatedOn = DateTime.Now;
            account.Provider = "Internal";
            var result = await _userManager.CreateAsync(account, model.Password);
            if (result.Succeeded)
            {
                //var role = await _roleManager.FindByIdAsync(model.RoleId.ToString());
                //if (role != null)
                //{
                //    await _userManager.AddToRoleAsync(account, role.Name);
                //}
            }
            return result.Succeeded;

        }
        public async Task<bool> UpdateAsync(UserViewModel model)
        {
            UserDTO account = await _unitOfWork.UserSystemRepository.GetByIdAsync(model.Id);

            if (account == null)
            {
                return false;
            }
            //account.Email = model.Email;
            //account.NormalizedEmail = model.Email.ToUpper();
            account.PhoneNumber = model.PhoneNumber;
            account.IsActive = model.IsActive;
            account.ModifiedOn = DateTime.Now;
            //if (account.RoleId != model.RoleId)
            //{
            //    account.RoleId = model.RoleId;
            //    var role = await _roleManager.FindByIdAsync(model.RoleId.ToString());
            //    if (role != null)
            //    {
            //        // Remove existing roles
            //        var existingRoles = await _userManager.GetRolesAsync(account);
            //        await _userManager.RemoveFromRolesAsync(account, existingRoles);

            //        // Add new role
            //        await _userManager.AddToRoleAsync(account, role.Name);
            //    }
            //}
            //account.ModifiedBy = _userInformation.GetUserName();
            _unitOfWork.SaveChanges();
            return true;
        }
        //public async Task<bool> SoftDeleteAsync(int ID)
        //{

        //    //var account = await _unitOfWork.UserSystemRepository.GetByIdAsync(ID);
        //    //if (account != null)
        //    //{
        //    //    account.ModifiedOn = DateTime.Now;
        //    //    //account.ModifiedBy = _userInformation.GetUserName();
        //    //    _unitOfWork.SaveChanges();
        //    //}
        //    //return true;

        //}
        //public Task<bool> DeleteAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<bool> RestoreAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<bool> DeactivateUserAsync(int Id, string? userName)
        {
            var data = await _unitOfWork.UserSystemRepository.GetByIdAsync(Id);

            if (data == null)
                return false;

            data.IsActive = false;
            data.ModifiedOn = DateTime.Now;
            data.ModifiedBy = userName;

            _unitOfWork.UserTokenRepository.DeleteUserTokenByUserId(Id);

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> ActivateUserAsync(int Id, string? userName)
        {
            var data = await _unitOfWork.UserSystemRepository.GetByIdAsync(Id);

            if (data == null)
                return false;

            data.IsActive = true;
            data.ModifiedOn = DateTime.Now;
            data.ModifiedBy = userName;

            _unitOfWork.SaveChanges();
            return true;
        }
    }
}
