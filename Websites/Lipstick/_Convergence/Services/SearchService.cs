using Newtonsoft.Json;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick._Convergence.Services
{
    public class SearchService
    {
        private readonly ClientAppConfig _appConfig;

        public SearchService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<List<ProductClientViewModel>> GetSuggestProductBySearchText(string language, string searchText)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.SuggestProductBySearchTextUrl, searchText);
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
                        List<ProductClientViewModel> data = JsonConvert.DeserializeObject<List<ProductClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<ProductClientViewModel>> GetProductSearchResult(string language, string searchText, int pageIndex, int pageSize)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetProductSearchResultUrl, searchText, "/", pageIndex, "/", pageSize);
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
        //public async Task<IEnumerable<BlogClientViewModel>> GetBlogBySearchTextAsync(string language, string searchText)
        //{
        //    string baseUrl = _appConfig.GetBaseAPIURL();
        //    string url = string.Concat(_appConfig.GetBlogBySearchTextUrl, searchText);
        //    using (HttpClient httpClient = new HttpClient())
        //    {
        //        httpClient.BaseAddress = new Uri(baseUrl);
        //        httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
        //        httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

        //        HttpResponseMessage response = await httpClient.GetAsync(url);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            string responseData = await response.Content.ReadAsStringAsync();
        //            if (!string.IsNullOrEmpty(responseData))
        //            {
        //                IEnumerable<BlogClientViewModel> data = JsonConvert.DeserializeObject<IEnumerable<BlogClientViewModel>>(responseData);
        //                return data;
        //            }
        //        }
        //    }
        //    return null;
        //}
    }
}
