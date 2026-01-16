using Microsoft.EntityFrameworkCore.Storage;
using PersonalFinanceDataAccess.IRepositories;
using PersonalFinanceDataAccess.Repositories;

namespace PersonalFinanceDataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private IDbContextTransaction? _transaction;
        private bool disposed = false;

        public ICategoryRepository CategoryRepository { get; private set; }

        public ISubCategoryRepository SubCategoryRepository { get; private set; }

        public IResourceRepository ResourceRepository { get; private set; }

        public IResourceTypeRepository ResourceTypeRepository { get; private set; }

        public IExpenseRepository ExpenseRepository { get; private set; }

        public UnitOfWork(ApplicationContext databaseContext)
        {
            context = databaseContext;
            CategoryRepository = new CategoryRepository(context);
            SubCategoryRepository = new SubCategoryRepository(context);
            ResourceRepository = new ResourceRepository(context);
            ResourceTypeRepository = new ResourceTypeRepository(context);
            ExpenseRepository = new ExpenseRepository(context);
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
