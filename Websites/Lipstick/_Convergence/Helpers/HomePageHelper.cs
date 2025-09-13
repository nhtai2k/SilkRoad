using Common;
using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Services;
using System.Drawing.Printing;

namespace Lipstick._Convergence.Helpers
{
    public sealed class HomePageHelper
    {
        private readonly TopicService _topicService;
        private readonly BannerService _bannerService;
        private readonly ProductService _productService;
        public HomePageHelper(TopicService topicService, BannerService bannerService, ProductService productService)
        {
            _topicService = topicService;
            _bannerService = bannerService;
            _productService = productService;
        }
        public async Task<HomePageViewModel> GetHomePageAsync(string language, string userId)
        {
            HomePageViewModel homePageViewModel = new HomePageViewModel();
            var banners = await _bannerService.GetAllActive(language);
            var lastestProducts = await _productService.GetLatestProduct(language, userId);
            var bestSellerProducts = await _productService.GetBestSellerProduct(language, userId);
            var saleOffProducts = await _productService.GetSaleOffProduct(language, userId);
            homePageViewModel.Topics = await _topicService.GetTopicsInHomePage(language);
            homePageViewModel.MainBanners = banners?.Where(x => x.BannerTypeId == (int)EBanners.MainBanner).ToList();
            homePageViewModel.SubBanners = banners?.Where(x => x.BannerTypeId == (int)EBanners.SubBanner).ToList();
            if(lastestProducts != null && lastestProducts.Items != null)
            {
                homePageViewModel.LatestProducts = lastestProducts.Items.ToList();
            }
            if (bestSellerProducts != null && bestSellerProducts.Items != null)
            {
                homePageViewModel.BestSellerProducts = bestSellerProducts.Items.ToList();
            }
            if (saleOffProducts != null && saleOffProducts.Items != null)
            {
                homePageViewModel.SaleOffProducts = saleOffProducts.Items.ToList();
            }
            return homePageViewModel;
        }
    }
}
