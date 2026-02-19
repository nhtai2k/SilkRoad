using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        #region QMS
        ICategoryRepository CategoryRepository { get; }
        IChatMessageRepository ChatMessageRepository { get; }
        IDishRepository DishRepository { get; }
        IReservationRepository ReservationRepository { get; }
        ITableRepository TableRepository { get; }
        IUnitRepository UnitRepository { get; }
        #endregion

        void BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
