using MemberDataAccess;
using MemberDataAccess.DTOs;
using MemberDataAccess.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace MemberDataAccess.Repositories
{
    public class UserRepository : GenericRepository<UserDTO>, IUserRepository
    {
        private DbSet<UserDTO> _users;
        public UserRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _users = dbContext.Set<UserDTO>();
        }
        /// <summary>
        /// return true if email existed
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<bool> CheckEmailAsync(string email)
        {
            return await _users.AnyAsync(user => user.Email == email);
        }
        /// <summary>
        /// return true if phonnumber existed
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        public async Task<bool> CheckPhoneNumberAsync(string phoneNumber)
        {
            return await _users.AnyAsync(user => user.PhoneNumber == phoneNumber);
        }
    }
}
