using RestaurantDataAccess.IRepositories;
using RestaurantDataAccess.Repositories;
namespace RestaurantDataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private bool disposed = false;
        #region QMS
        public ICategoryRepository CategoryRepository { get; private set; }
        public IChatMessageRepository ChatMessageRepository { get; private set; }
        public IDishRepository DishRepository { get; private set; }
        public IReservationRepository ReservationRepository { get; private set; }
        public ITableRepository TableRepository { get; private set; }
        public IUnitRepository UnitRepository { get; private set; }
        #endregion

        public UnitOfWork(ApplicationContext context)
        {
            this.context = context;
            #region QMS
            CategoryRepository = new CategoryRepository(context);
            ChatMessageRepository = new ChatMessageRepository(context);
            DishRepository = new DishRepository(context);
            ReservationRepository = new ReservationRepository(context);
            TableRepository = new TableRepository(context);
            UnitRepository = new UnitRepository(context);
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
