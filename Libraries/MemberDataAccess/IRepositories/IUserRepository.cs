using Member.DAL.DTOs;

namespace Member.DAL.IRepositories
{
    public interface IUserRepository : IGenericRepository<UserDTO>
    {
        public Task<bool> CheckPhoneNumberAsync(string phoneNumber);
        public Task<bool> CheckEmailAsync(string email);
    }
}
