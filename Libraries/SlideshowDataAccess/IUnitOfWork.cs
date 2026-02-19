using Microsoft.EntityFrameworkCore.Storage;
using Slideshow.DAL.IRepositories;

namespace Slideshow.DAL
{
    public interface IUnitOfWork : IDisposable
    {

        public ISlideThemeRepository SlideThemeRepository { get; }
        public ISlideRepository SlideRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
