using MemberDataAccess.Repositories;
using MemberDataAccess.IRepositories;
namespace MemberDataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private bool disposed = false;

        #region System
        public IUserRepository UserRepository { get; private set; }
        public IGenderRepository GenderRepository { get; private set; }
        public IRoleRepository RoleRepository { get; private set; }
        public IFavoriteRepository FavoriteRepository { get; private set; }
        #endregion

        public UnitOfWork(ApplicationContext context)
        {
            this.context = context;
            #region System
            UserRepository = new UserRepository(context);
            GenderRepository = new GenderRepository(context);
            RoleRepository = new RoleRepository(context);
            FavoriteRepository = new FavoriteRepository(context);
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
        public void BeginTransaction()
        {
            throw new NotImplementedException();
        }
        public void Commit()
        {
            throw new NotImplementedException();
        }
        public void Rollback()
        {
            throw new NotImplementedException();
        }
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
