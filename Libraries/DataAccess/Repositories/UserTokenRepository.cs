using Microsoft.EntityFrameworkCore;
using System.DAL.DTOs;
using System.DAL.IRepositories;

namespace System.DAL.Repositories
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
