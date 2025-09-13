using MemberDataAccess.IRepositories;

namespace MemberDataAccess
{
    public interface IUnitOfWork : IDisposable
    {

        #region System
        IUserRepository UserRepository { get; }
        IGenderRepository GenderRepository { get; }
        IRoleRepository RoleRepository { get; }
        IFavoriteRepository FavoriteRepository { get; }
        #endregion

        void BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
