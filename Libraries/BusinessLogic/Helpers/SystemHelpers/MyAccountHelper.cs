using AutoMapper;
using BusinessLogic.IHelpers.ISystemHelpers;
using Common;
using Common.Models;
using Common.Services.JwtServices;
using Common.ViewModels.SystemViewModels;
using DataAccess;
using DataAccess.DTOs;
using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Spreadsheet;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BusinessLogic.Helpers.SystemHelpers
{
    public class MyAccountHelper : IMyAccountHelper
    {
        private readonly SignInManager<UserDTO> _signInManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<UserDTO> _userManager;
        //private readonly RoleManager<RoleDTO> _roleManager;
        private readonly IJwtService _jwtService;
        public MyAccountHelper(
            IUnitOfWork unitOfWork,
            SignInManager<UserDTO> signInManager,
            IMapper mapper,
            UserManager<UserDTO> userManager,
            //RoleManager<RoleDTO> roleManager,
            IJwtService jwtService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            //_roleManager = roleManager;
            _jwtService = jwtService;
            _signInManager = signInManager;
            //_userInformation = userInformation;
            //_userLogHelper = userLogHelper;
        }
        public async Task<UserDTO?> FindByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        public async Task<JwtViewModel> AuthenticateAsync(UserDTO user, bool rememberMe)
        {

            JwtViewModel jwtViewModel = new JwtViewModel();

            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
                    {
                        new Claim("Id",user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.UserName ?? ""),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            jwtViewModel.Token = _jwtService.CreateToken(authClaims);
            jwtViewModel.RefreshToken = _jwtService.GenerateRefreshToken();
            UserTokenDTO userToken = new UserTokenDTO
            {
                UserId = user.Id,
                LoginProvider = "Web API",
                Name = "RefreshToken",
                Value = jwtViewModel.RefreshToken,
                ExpirationTime = DateTime.Now.AddDays(1)
            };
            if (rememberMe)
            {
                userToken.ExpirationTime = DateTime.Now.AddYears(100);
            }
            var userTokens = await _unitOfWork.UserTokenRepository.GetAllAsync(s => s.UserId == user.Id);
            if (userTokens != null)
            {
                foreach (var item in userTokens)
                {
                    _unitOfWork.UserTokenRepository.Delete(item);
                }
            }
            await _unitOfWork.UserTokenRepository.CreateAsync(userToken);
            await _unitOfWork.SaveChangesAsync();

            return jwtViewModel;
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenAsync(ExternalAuthModel externalAuth)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { "1094526113359-1m12npd4537dbullidve99h9pkja38e2.apps.googleusercontent.com" }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                //log an exception
                return null;
            }
        }

        public async Task<JwtViewModel?> ExternalLoginAsync(ExternalAuthModel externalAuth)
        {
            var payload = await VerifyGoogleTokenAsync(externalAuth);
            if (payload == null)
                return null;

            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    user = new UserDTO { Email = payload.Email, UserName = payload.Email, IsActive = true };
                    await _userManager.CreateAsync(user);

                    //prepare and send an email for the email confirmation

                    await _userManager.AddToRoleAsync(user, ERoles.User.ToString());
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                {
                    await _userManager.AddLoginAsync(user, info);
                }
            }

            if (user == null)
                return null;


            return await AuthenticateAsync(user, false);
        }

        public async Task<bool> ValidateRefreshTokenAsync(string refreshToken)
        {
            try
            {
                var data = await _unitOfWork.UserTokenRepository.GetUserTokenByRefreshToken(refreshToken);
                if (data != null)
                {
                    if (data.ExpirationTime > DateTime.Now)
                    {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string?> ReNewTokenAsync(string refreshToken, string token)
        {
            if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(token))
            {
                return null;
            }
            bool check = await ValidateRefreshTokenAsync(refreshToken);
            if (!check)
            {
                return null;
            }
            return _jwtService.RenewToken(token);

        }

        public async Task<string?> RefreshTokenAsync(string refreshToken)
        {
            var data = await _unitOfWork.UserTokenRepository.GetUserTokenByRefreshToken(refreshToken);
            if (data != null && data.ExpirationTime > DateTime.Now)
            {
                var user = await _userManager.FindByIdAsync(data.UserId.ToString());
                if (user == null)
                    return null;

                var userRoles = await _userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                    {
                        new Claim("Id",user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.UserName ?? ""),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                return _jwtService.CreateToken(authClaims);
            }
            return null;
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordViewModel model)
        {
            var user = await _unitOfWork.UserSystemRepository.GetByIdAsync(model.UserId);
            if (user == null || model.NewPassword != model.ConfirmPassword)
            {
                return false;
            }
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> RecoverPassword(RecoverPasswordViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return false;
                }
                //string baseUrl = _settingHelper.GetValueByKey(EWebConfig.AdminLoginUrl);
                //string token = await _userManager.GeneratePasswordResetTokenAsync(user);
                //string subject = _webTemplateHelper.GetValueByKey(EWebTemplate.SubjectResetPassword, ELanguage.VN.ToString());
                //string body = _webTemplateHelper.GetValueByKey(EWebTemplate.CRMBodyResetPassword, ELanguage.VN.ToString());
                //SingleEmailModel singleEmail = new SingleEmailModel();
                //singleEmail.To = user.Email;
                //singleEmail.Subject = subject;
                //singleEmail.Body = body.Replace("#BaseUrl#", baseUrl).Replace("#Token#", token).Replace("#Email#", user.Email);
                //return await _mailService.SendSingleEmailAsync(singleEmail, new CancellationToken());
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            return result.Succeeded;
        }

        public async Task<Microsoft.AspNetCore.Identity.SignInResult> CheckPasswordSignInAsync(UserDTO user, string password)
        {
            return await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: true);
        }

        public async Task<bool> RevokeRefreshTokenAsync(string refreshToken)
        {
            try
            {
                var data = await _unitOfWork.UserTokenRepository.GetUserTokenByRefreshToken(refreshToken);
                if (data == null)
                    return false;

                _unitOfWork.UserTokenRepository.Delete(data);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserLoginInfoModel?> GetCurrentUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return null;
            var userRoles = await _userManager.GetRolesAsync(user);
            return new UserLoginInfoModel
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Roles = userRoles.ToList()
            };
        }
    }
}
