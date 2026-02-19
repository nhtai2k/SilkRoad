namespace System.Share
{
    public class ClientAppConfig
    {
        public required string ProductMode { get; set; }
        public required string ProdBaseAPIUrl { get; set; }
        public required string DevBaseAPIUrl { get; set; }
        public required string ApiKey { get; set; }
        public required string QRBankingUrl { get; set; }
        //InforPage
        public required string GetByPageTypeIdInforPageUrl { get; set; }
        public required string GetAllActiveBrandUrl { get; set; }
        public required string GetNavigationBarUrl { get; set; }
        public required string GetMenuUrl { get; set; }
        //Blog
        public required string GetAllActiveBlogUrl { get; set; }
        public required string GetLatestBlogsUrl { get; set; }
        public required string GetBlogByIdUrl { get; set; }
        public required string GetBlogsByTopicIdUrl { get; set; }
        //Topic
        public required string GetAllActiveTopicUrl { get; set; }
        public required string GetTopicsInHomePageUrl { get; set; }
        //HomeBanner
        public required string GetAllActiveHomeBannerUrl { get; set; }
        //Product
        public required string GetProductsByCategoryIdAndSubCategoryIdUrl { get; set; }
        public required string GetProductByIdUrl { get; set; }
        public required string GetLastestProductsUrl { get; set; }
        public required string GetBestSellerProductsUrl { get; set; }
        public required string GetSaleOffProductsUrl { get; set; }
        public required string GetRelatedProducts { get; set; }
        public required string GetFavoritedProductsUrl { get; set; }
        //Survey
        public required string GetEagerSurveyUIByIdUrl { get; set; }
        public required string CreateParticipantUrl { get; set; }
        //Search
        public required string GetProductBySearchTextUrl { get; set; }
        //public required string GetBlogBySearchTextUrl { get; set; }
        public required string SuggestProductBySearchTextUrl { get; set; }
        public required string GetProductSearchResultUrl { get; set; }
        //PageIntro
        public required string GetByPageTypeIdPageIntroUrl { get; set; }
        //Order history
        public required string CreateOrderUrl { get; set; }
        //public required string GetOrderByMemberIdUrl { get; set; }
        //public required string GetOrderByPhoneNumberUrl { get; set; }
        //public required string GetOrderByIdUrl { get; set; }
        //Cart
        public required string GetCartUrl { get; set; }
        public string GetBaseAPIURL()
        {
            if (string.IsNullOrEmpty(DevBaseAPIUrl) || string.IsNullOrEmpty(ProdBaseAPIUrl) || string.IsNullOrEmpty(ProductMode))
            {
                throw new Exception("Base API URL is not configured in appsettings.json");
            }
            string url = DevBaseAPIUrl;
            if (ProductMode.ToUpper() == "PROD")
            {
                url = ProdBaseAPIUrl;
            }
            return url;
        }
    }
}
