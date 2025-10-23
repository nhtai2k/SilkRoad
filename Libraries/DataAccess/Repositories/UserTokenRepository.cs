using DataAccess.DTOs;
using DataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class UserTokenRepository : GenericRepository<UserTokenDTO>, IUserTokenRepository
    {
        public UserTokenRepository(ApplicationContext context) : base(context)
        {
        }
        public void DeleteUserTokenByUserId(int userId)
        {
            _dbSet.RemoveRange(_dbSet.Where(s => s.UserId == userId));
        }
        public async Task<UserTokenDTO?> GetUserTokenByRefreshToken(string refreshToken)
        {
            return await _dbSet.Where(s => string.Equals(s.Value, refreshToken)).FirstOrDefaultAsync();
        }
    }
}
