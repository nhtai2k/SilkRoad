using Member.BLL.IHelpers;
using Member.DAL;
using Member.DAL.DTOs;
using Microsoft.AspNetCore.Identity;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Member.BLL.Helpers
{
    public class MyAccountHelper : IMyAccountHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<UserDTO> _userManager;
        public MyAccountHelper(IUnitOfWork unitOfWork, UserManager<UserDTO> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<IdentityResult> ChangePasswordAsync(int userId, ChangePasswordClientViewModel model)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(userId);
            return await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
        }

        public UserClientViewModel? GetUserById(int Id)
        {
            var data = _unitOfWork.UserRepository.GetById(Id);
            return data == null ? null : new UserClientViewModel
            {
                Id = data.Id,
                FullName = data.FullName,
                PhoneNumber = data.PhoneNumber,
                Email = data.Email,
                GenderId = data.GenderId,
                Birthday = data.Birthday,
                ProvinceId = data.ProvinceId,
                DistrictId = data.DistrictId,
                Address = data.Address
            };
        }

        public async Task<UserClientViewModel?> GetUserByIdAsync(int Id)
        {
            var data = await _unitOfWork.UserRepository.GetByIdAsync(Id);
            return data == null ? null : new UserClientViewModel
            {
                FullName = data.FullName,
                PhoneNumber = data.PhoneNumber,
                Email = data.Email,
                GenderId = data.GenderId,
                Birthday = data.Birthday,
                ProvinceId = data.ProvinceId,
                DistrictId = data.DistrictId,
                Address = data.Address
            };
        }

        public Task<bool> RegisterAsync(UserClientViewModel model)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAsync(UserClientViewModel model)
        {
            var userList = await _unitOfWork.UserRepository.GetAllAsync(filter: s => s.UserName == model.PhoneNumber);
            var user = userList.FirstOrDefault();
            if (user == null)
            {
                return false;
            }
            user.FullName = model.FullName;
            user.Email = model.Email;
            user.GenderId = model.GenderId;
            if (model.Birthday != null)
            {
                user.Birthday = model.Birthday.Value;
            }
            user.ProvinceId = model.ProvinceId;
            user.DistrictId = model.DistrictId;
            user.Address = model.Address;
            user.ModifiedOn = DateTime.Now;

            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
