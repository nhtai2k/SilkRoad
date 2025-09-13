using Common;
using Common.ViewModels.LipstickClientViewModels;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Services
{
    public class BannerService
    {
        private readonly ClientAppConfig _appConfig;
        public BannerService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<IEnumerable<HomeBannerClientViewModel>?> GetAllActive(string language)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetAllActiveHomeBannerUrl;
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
                        IEnumerable<HomeBannerClientViewModel> data = JsonConvert.DeserializeObject<IEnumerable<HomeBannerClientViewModel>>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
    }
}
