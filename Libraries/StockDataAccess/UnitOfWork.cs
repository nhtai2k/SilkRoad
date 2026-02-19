using Microsoft.EntityFrameworkCore.Storage;
using Stock.DAL.IRepositories;
using Stock.DAL.Repositories;

namespace Stock.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private IDbContextTransaction? _transaction;
        private bool disposed = false;

        public ICompanyRepository CompanyRepository { private set; get; }
        public IStockPriceRepository StockPriceRepository { private set; get; }
        public IIndustryRepository IndustryRepository { private set; get; }
        public ITradeHistoryRepository TradeHistoryRepository { private set; get; }
        public IHandbookRepository HandbookRepository { private set; get; }

        public UnitOfWork(ApplicationContext databaseContext)
        {
            context = databaseContext;
            CompanyRepository = new CompanyRepository(context);
            StockPriceRepository = new StockPriceRepository(context);
            IndustryRepository = new IndustryRepository(context);
            TradeHistoryRepository = new TradeHistoryRepository(context);
            HandbookRepository = new HandbookRepository(context);
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
