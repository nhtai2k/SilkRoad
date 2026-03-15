using System.DAL.DTOs;
using System.DAL.IRepositories;

namespace System.DAL.Repositories
{
    public class RefreshTokenRepository : GenericRepository<RefreshTokenDTO>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(ApplicationContext context) : base(context)
        {
        }

        public void DeleteTokenByUserId(int userId)
        {
            var data = _dbSet.Where(rt => rt.UserId == userId);
            _dbSet.RemoveRange(data);
        }
    }
}
