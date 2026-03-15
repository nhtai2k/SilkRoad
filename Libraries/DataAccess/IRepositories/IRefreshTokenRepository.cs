using System.DAL.DTOs;

namespace System.DAL.IRepositories
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshTokenDTO>
    {
        public void DeleteTokenByUserId(int userId);
    }
}
