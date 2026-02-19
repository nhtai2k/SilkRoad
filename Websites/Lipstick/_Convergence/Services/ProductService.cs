using Newtonsoft.Json;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick._Convergence.Services
{
    public class ProductService
    {
        private readonly ClientAppConfig _appConfig;
        public ProductService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetByCategoryIdAndSubCategoryId(string language, int categoryId, int subCategoryId, string userId = "-1", int pageIndex = 1, int pageSize = 8)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetProductsByCategoryIdAndSubCategoryIdUrl + userId + "/" + categoryId + "/" + subCategoryId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<ProductClientViewModel?> GetById(string language, int id)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetProductByIdUrl, id);
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        ProductClientViewModel data = JsonConvert.DeserializeObject<ProductClientViewModel>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetLatestProduct(string language, string userId = "-1", int pageIndex = 1, int pageSize = 8)
        {

            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetLastestProductsUrl + userId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetBestSellerProduct(string language, string userId = "-1", int pageIndex = 1, int pageSize = 8)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetBestSellerProductsUrl + userId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetSaleOffProduct(string language, string userId = "-1", int pageIndex = 1, int pageSize = 8)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetSaleOffProductsUrl + userId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetRelatedProduct(string language, int productId, string userId = "-1", int pageIndex = 1, int pageSize = 8)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetRelatedProducts + userId + "/" + productId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>?> GetFavoritedProduct(string language, int userId, int pageIndex = 1, int pageSize = 8)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetFavoritedProductsUrl + userId + "/" + pageIndex + "/" + pageSize;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        Pagination<ProductClientViewModel> data = JsonConvert.DeserializeObject<Pagination<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
    }
}
