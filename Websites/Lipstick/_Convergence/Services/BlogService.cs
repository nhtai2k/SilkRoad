using Newtonsoft.Json;
using System.Share;
using System.Share.Models;
using System.Share.ViewModels.LipstickClientViewModels;

namespace Lipstick._Convergence.Services
{
    public class BlogService
    {
        private readonly ClientAppConfig _appConfig;
        public BlogService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }

        public async Task<IEnumerable<BlogClientViewModel>?> GetAllActive(string language)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetAllActiveBlogUrl;
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
                        IEnumerable<BlogClientViewModel> data = JsonConvert.DeserializeObject<IEnumerable<BlogClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<Pagination<BlogClientViewModel>?> GetByTopicId(string language, int topicId, int pageIndex, int pageSize)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetBlogsByTopicIdUrl, topicId, "/", pageIndex, "/", pageSize);
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
                        Pagination<BlogClientViewModel> data = JsonConvert.DeserializeObject<Pagination<BlogClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<IEnumerable<BlogClientViewModel>?> GetLatestBlogs(string language, int numberOfBlog = 3)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetLatestBlogsUrl, numberOfBlog);
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
                        IEnumerable<BlogClientViewModel> data = JsonConvert.DeserializeObject<IEnumerable<BlogClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
        public async Task<BlogClientViewModel?> GetById(string language, int id)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetBlogByIdUrl, id);
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
                        BlogClientViewModel data = JsonConvert.DeserializeObject<BlogClientViewModel>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
    }
}
