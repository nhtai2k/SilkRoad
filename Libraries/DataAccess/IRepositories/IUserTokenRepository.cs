using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IUserTokenRepository : IGenericRepository<UserTokenDTO>
    {
        public Task<UserTokenDTO?> GetUserTokenByRefreshToken(string refreshToken);
        public void DeleteUserTokenByUserId(int userId);
    }
}
