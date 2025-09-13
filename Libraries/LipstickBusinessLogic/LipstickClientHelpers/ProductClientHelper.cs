using Common;
using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using LipstickBusinessLogic.ILipstickClientHelpers;
using LipstickDataAccess;
using LipstickDataAccess.MemberContext;
using Microsoft.EntityFrameworkCore;

namespace LipstickBusinessLogic.LipstickClientHelpers
{
    public class ProductClientHelper : IProductClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;
        private readonly LipstickMemberDatabaseContext _memberContext;
        public ProductClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig, LipstickMemberDatabaseContext memberContext)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
            _memberContext = memberContext;
        }
        /// <summary>
        /// Get products by category and subcategory ID
        /// </summary>
        /// <param name="language"></param>
        /// <param name="categoryId"></param>
        /// <param name="subCategoryId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetByCategoryIdSubCategoryIdAsync(string language, int categoryId, int subCategoryId, int pageIndex, int pageSize, int userId)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);
            // Get list favorite products by userId
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var favoriteProductIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive);

            // Filter by categoryId if provided
            if (categoryId != -1)
            {
                query = query.Where(s => s.CategoryId == categoryId);
            }

            // Filter by subCategoryId if provided
            if (subCategoryId != -1)
            {
                query = query.Where(s => s.SubCategoryId == subCategoryId);
            }

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = favoriteProductIdList.Contains(x.Id) // Check if the product is favorited by the user
            }).ToList();
            // Return the paginated result
            return model;
        }
        /// <summary>
        /// Get the latest products: order by created on date
        /// </summary>
        /// <param name="language"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetLatestProductAsync(string language, int pageIndex, int pageSize, int userId)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);
            // Get list favorite products by userId
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var favoriteProductIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive, orderBy: p => p.OrderBy(s => s.CreatedOn));

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = favoriteProductIdList.Contains(x.Id)
            }).ToList();
            // Return the paginated result
            return model;
        }
        /// <summary>
        /// Get best-selling products: ***I havn't implemented logic yet***
        /// </summary>
        /// <param name="language"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetBestSellerProductAsync(string language, int pageIndex, int pageSize, int userId)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);
            // Get list favorite products by userId
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var favoriteProductIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive, orderBy: p => p.OrderBy(s => s.CreatedOn));

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = favoriteProductIdList.Contains(x.Id)
            }).ToList();
            // Return the paginated result
            return model;
        }
        /// <summary>
        /// Get products on sale
        /// </summary>
        /// <param name="language"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetSaleOffProductAsync(string language, int pageIndex, int pageSize, int userId)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);
            // Get list favorite products by userId
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var favoriteProductIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive && s.SaleOff, orderBy: p => p.OrderBy(s => s.CreatedOn));

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Details = language == ELanguages.VN.ToString() ? x.DetailsVN : x.DetailsEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = favoriteProductIdList.Contains(x.Id)
            }).ToList();
            // Return the paginated result
            return model;
        }
        /// <summary>
        /// Get related products: ***I havn't implemented logic yet***
        /// </summary>
        /// <param name="language"></param>
        /// <param name="productId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetRelatedProductAsync(string language, int productId, int pageIndex, int pageSize, int userId)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);
            // Get list favorite products by userId
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var favoriteProductIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive, orderBy: p => p.OrderBy(s => s.CreatedOn));

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = favoriteProductIdList.Contains(x.Id)
            }).ToList();
            // Return the paginated result
            return model;
        }
        /// <summary>
        /// Get product by ID
        /// </summary>
        /// <param name="language"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ProductClientViewModel> GetByIdAsync(string language, int id)
        {
            var data = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            if (data == null)
                return null;
            var brand = await _unitOfWork.BrandRepository.GetByIdAsync(data.BrandId);
            return new ProductClientViewModel
            {
                Id = data.Id,
                CategoryId = data.CategoryId,
                SubCategoryId = data.SubCategoryId,
                BrandId = data.BrandId,
                SizeId = data.SizeId,
                ColorId = data.ColorId,
                Name = language == ELanguages.VN.ToString() ? data.NameVN : data.NameEN,
                Description = language == ELanguages.VN.ToString() ? data.DescriptionVN : data.DescriptionEN,
                Details = language == ELanguages.VN.ToString() ? data.DetailsVN : data.DetailsEN,
                Images = data.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, data.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, data.BackgroundImage).Replace(@"\", @"/"),
                Price = data.Price,
                Quantity = data.Quantity,
                DiscountPercent = data.DiscountPercent,
                StartDiscountDate = data.StartDiscountDate,
                EndDiscountDate = data.EndDiscountDate,
                SaleOff = data.SaleOff,
                SalePrice = data.SalePrice,
            };

        }

        /// <summary>
        /// Get favorite products by user ID
        /// </summary>
        /// <param name="language"></param>
        /// <param name="userId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Pagination<ProductClientViewModel>> GetFavoriteProductByUserIdAsync(string language, int userId, int pageIndex, int pageSize)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;
            var favoriteList = _memberContext.TableFavorites.Where(s => s.UserId == userId);
            var productIdList = favoriteList.Select(s => s.ProductId).ToList();

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive && productIdList.Contains(s.Id));

            // Paginate the query
            var data = await query.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();

            // Calculate total items and pages
            model.TotalItems = await query.CountAsync();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);
            // Map the product data to the view model
            model.Items = data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                SubCategoryId = x.SubCategoryId,
                BrandId = x.BrandId,
                SizeId = x.SizeId,
                ColorId = x.ColorId,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Images = x.Images?.Split(';').Select(s => string.Concat(_appConfig.ServerUrl, s).Replace(@"\", @"/")).ToList() ?? new List<string>(),
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/"),
                BackgroundImage = string.Concat(_appConfig.ServerUrl, x.BackgroundImage).Replace(@"\", @"/"),
                Price = x.Price,
                Quantity = x.Quantity,
                DiscountPercent = x.DiscountPercent,
                StartDiscountDate = x.StartDiscountDate,
                EndDiscountDate = x.EndDiscountDate,
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
                IsFavorited = true
            }).ToList();
            // Return the paginated result
            return model;
        }
    }
}
