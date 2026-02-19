using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using Microsoft.EntityFrameworkCore;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class SearchClientHelper : ISearchClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;

        public SearchClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }

        public async Task<Pagination<ProductClientViewModel>> GetProductSearchResultAsync(string language, string searchText, int pageIndex, int pageSize)
        {
            // Initialize the pagination model
            Pagination<ProductClientViewModel> model = new Pagination<ProductClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;

            // Fetch all active and non-deleted brands
            var brands = await _unitOfWork.BrandRepository.GetAllAsync(filter: s => !s.IsDeleted);

            // Query products that are active and not deleted
            var query = _unitOfWork.ProductRepository.Query(filter: s => !s.IsDeleted && s.IsActive);
            if (string.Equals(language, ELanguages.VN.ToString()))
            {
                query = query.Where(s => s.NameVN.ToLower().Contains(searchText.ToLower()) || s.DescriptionVN.ToLower().Contains(searchText.ToLower()));
            }
            else if (string.Equals(language, ELanguages.EN.ToString()))
            {
                query = query.Where(s => s.NameEN.ToLower().Contains(searchText.ToLower()) || s.DescriptionEN.ToLower().Contains(searchText.ToLower()));

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
                SaleOff = x.SaleOff,
                SalePrice = x.SalePrice,
            }).ToList();
            // Return the paginated result
            return model;
        }
        #region Suggest blogs by search text
        /// <summary>
        /// Search text in blog name and description.
        /// </summary>
        //public async Task<List<BlogClientViewModel>> GetBlogBySearchTextAsync(string language, string searchText)
        //{
        //    if (string.IsNullOrEmpty(searchText)) return new List<BlogClientViewModel>();

        //    return language switch
        //    {
        //        var lang when string.Equals(lang, ELanguages.EN.ToString()) => await GetBlogByTextAsync(searchText, true),
        //        var lang when string.Equals(lang, ELanguages.VN.ToString()) => await GetBlogByTextAsync(searchText, false),
        //        _ => new List<BlogClientViewModel>()
        //    };
        //}

        //private async Task<List<BlogClientViewModel>> GetBlogByTextAsync(string searchText, bool isEnglish)
        //{
        //    var data = await _unitOfWork.BlogRepository
        //        .Query(x => (isEnglish
        //                ? x.SubjectEN.ToLower().Contains(searchText.ToLower()) || x.DescriptionEN.ToLower().Contains(searchText.ToLower())
        //                : x.SubjectVN.ToLower().Contains(searchText.ToLower()) || x.DescriptionVN.ToLower().Contains(searchText.ToLower())))
        //        .Take(3)
        //        .ToListAsync();

        //    return data.Select(x => new BlogClientViewModel
        //    {
        //        Id = x.Id,
        //        TopicId = x.TopicId,
        //        Subject = isEnglish ? x.SubjectEN : x.SubjectVN
        //    }).ToList();
        //}
        #endregion
        /// <summary>
        /// Search text in product name and description.
        /// </summary>
        public async Task<List<ProductClientViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10)
        {
            if (string.IsNullOrEmpty(searchText)) return new List<ProductClientViewModel>();

            return language switch
            {
                var lang when string.Equals(lang, ELanguages.EN.ToString()) => await GetProductByTextAsync(searchText, true, quantity),
                var lang when string.Equals(lang, ELanguages.VN.ToString()) => await GetProductByTextAsync(searchText, false, quantity),
                _ => new List<ProductClientViewModel>()
            };
        }
        private async Task<List<ProductClientViewModel>> GetProductByTextAsync(string searchText, bool isEnglish, int quantity)
        {
            var data = await _unitOfWork.ProductRepository
                .Query(x => (isEnglish
                        ? x.NameEN.ToLower().Contains(searchText.ToLower()) || x.DescriptionEN.ToLower().Contains(searchText.ToLower())
                        : x.NameVN.ToLower().Contains(searchText.ToLower()) || x.DescriptionVN.ToLower().Contains(searchText.ToLower())))
                .Take(quantity)
                .ToListAsync();

            return data.Select(x => new ProductClientViewModel
            {
                Id = x.Id,
                Name = isEnglish ? x.NameEN : x.NameVN,
                Avatar = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/")

            }).ToList();
        }

    }
}
