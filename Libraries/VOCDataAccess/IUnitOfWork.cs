using Microsoft.EntityFrameworkCore.Storage;
using VOC.DAL.IRepositories;

namespace VOC.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        IFeedbackStatusRepository FeedbackStatusRepository { get; }
        IFeedbackPriorityRepository FeedbackPriorityRepository { get; }
        IDepartmentRepository DepartmentRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        IForwardFeedbackRepository ForwardFeedbackRepository { get; }
        IFeedbackTypeRepository FeedbackTypeRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
