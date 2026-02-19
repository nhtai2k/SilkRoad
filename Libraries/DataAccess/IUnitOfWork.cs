using Microsoft.EntityFrameworkCore.Storage;
using System.DAL.IRepositories;

namespace System.DAL
{
    public interface IUnitOfWork : IDisposable
    {

        #region System
        IUserRepository UserSystemRepository { get; }
        IUserTokenRepository UserTokenRepository { get; }
        IModuleRepository ModuleRepository { get; }
        IRoleRepository RoleRepository { get; }
        IRoleClaimRepository RoleClaimRepository { get; }
        IControllerRepository ControllerRepository { get; }
        IActionRepository ActionRepository { get; }
        #endregion

        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
