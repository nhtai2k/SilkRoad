using Microsoft.EntityFrameworkCore.Storage;
using System.DAL.IRepositories;
using System.DAL.Repositories;
namespace System.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private bool disposed = false;
        private IDbContextTransaction? _transaction;


        #region System
        public IUserRepository UserSystemRepository { get; private set; }
        public IUserTokenRepository UserTokenRepository { get; private set; }
        public IRoleRepository RoleRepository { get; private set; }
        public IRoleClaimRepository RoleClaimRepository { get; private set; }
        public IModuleRepository ModuleRepository { get; private set; }
        public IControllerRepository ControllerRepository { get; private set; }
        public IActionRepository ActionRepository { get; private set; }
        #endregion

        public UnitOfWork(ApplicationContext context)
        {
            this.context = context;
            #region System
            UserSystemRepository = new UserRepository(context);
            UserTokenRepository = new UserTokenRepository(context);
            ModuleRepository = new ModuleRepository(context);
            RoleRepository = new RoleRepository(context);
            RoleClaimRepository = new RoleClaimRepository(context);
            ControllerRepository = new ControllerRepository(context);
            ActionRepository = new ActionRepository(context);
            #endregion

        }
        public void SaveChanges()
        {
            context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public IDbContextTransaction BeginTransaction()
        {
            _transaction = context.Database.BeginTransaction();
            return _transaction;
        }
        public void Commit()
        {
            try
            {
                _transaction?.Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public void Rollback()
        {
            try
            {
                _transaction?.Rollback();
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
