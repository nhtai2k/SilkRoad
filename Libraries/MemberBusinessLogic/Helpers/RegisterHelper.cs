using Common.ViewModels.LipstickClientViewModels;
using MemberBusinessLogic.IHelpers;
using MemberDataAccess;
using MemberDataAccess.DTOs;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MemberBusinessLogic.Helpers
{
    public class RegisterHelper : IRegisterHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<UserDTO> _userManager;

        public RegisterHelper(IUnitOfWork unitOfWork, UserManager<UserDTO> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<bool> CheckEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
                return false;

            return await _unitOfWork.UserRepository.CheckEmailAsync(email);
        }

        public async Task<bool> CheckPhoneNumberAsync(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
                return false;
            
            return await _unitOfWork.UserRepository.CheckPhoneNumberAsync(phoneNumber);
        }

        public async Task<bool> RegisterAsync(RegisterClientViewModel model)
        {
            UserDTO data = new UserDTO()
            {
                UserName = model.PhoneNumber,
                PhoneNumber = model.PhoneNumber,
                FullName = model.FullName,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(data, model.Password);
            return result.Succeeded;
        }
    }
}
