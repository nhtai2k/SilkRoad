namespace Common.ViewModels.LipstickClientViewModels
{
    public class HomePageViewModel
    {
        public IEnumerable<HomeBannerClientViewModel>? MainBanners { get; set; }
        public IEnumerable<HomeBannerClientViewModel>? SubBanners { get; set; }
        public IEnumerable<TopicClientViewModel>? Topics { get; set; }
        public IEnumerable<ProductClientViewModel>? LatestProducts { get; set; }
        public IEnumerable<ProductClientViewModel>? BestSellerProducts { get; set; }
        public IEnumerable<ProductClientViewModel>? SaleOffProducts { get; set; }
    }
}
