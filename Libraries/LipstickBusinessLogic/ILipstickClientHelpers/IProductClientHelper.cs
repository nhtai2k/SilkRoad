using Common.Models;
using Common.ViewModels.LipstickClientViewModels;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface IProductClientHelper
    {
        public Task<Pagination<ProductClientViewModel>> GetByCategoryIdSubCategoryIdAsync(string language, int categoryId, int subCategoryId, int pageIndex, int pageSize, int userId);
        public Task<ProductClientViewModel> GetByIdAsync(string language, int id);
        public Task<Pagination<ProductClientViewModel>> GetLatestProductAsync(string language, int pageIndex, int pageSize, int userId);
        public Task<Pagination<ProductClientViewModel>> GetBestSellerProductAsync(string language, int pageIndex, int pageSize, int userId);
        public Task<Pagination<ProductClientViewModel>> GetSaleOffProductAsync(string language, int pageIndex, int pageSize, int userId);
        public Task<Pagination<ProductClientViewModel>> GetRelatedProductAsync(string language, int productId, int pageIndex, int pageSize, int userId);
        public Task<Pagination<ProductClientViewModel>> GetFavoriteProductByUserIdAsync(string language, int userId, int pageIndex, int pageSize);
    }
}
