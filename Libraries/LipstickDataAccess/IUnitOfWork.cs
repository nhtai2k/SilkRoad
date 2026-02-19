using Lipstick.DAL.IRepositories;

namespace Lipstick.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        #region Lipstick
        IBlogRepository BlogRepository { get; }
        IBrandRepository BrandRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ISubCategoryRepository SubCategoryRepository { get; }
        IProductRepository ProductRepository { get; }
        ITopicRepository TopicRepository { get; }
        ISizeRepository SizeRepository { get; }
        IColorRepository ColorRepository { get; }
        IPageContentRepository PageContentRepository { get; }
        IPageTypeRepository PageTypeRepository { get; }
        IHomeBannerRepository HomeBannerRepository { get; }
        IPageIntroRepository PageIntroRepository { get; }
        IOrderRepository OrderRepository { get; }
        IOrderDetailRepository OrderDetailRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        #endregion

        void BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
