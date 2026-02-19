using System.DAL.DTOs;
using System.DAL.IRepositories;

namespace System.DAL.Repositories
{
    public class UserRepository : GenericRepository<UserDTO>, IUserRepository
    {
        public UserRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
