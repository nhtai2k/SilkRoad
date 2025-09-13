using Common;
using Common.ViewModels.LipstickClientViewModels;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Services
{
    public class PageIntroService
    {
        private readonly ClientAppConfig _appConfig;

        public PageIntroService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<PageIntroClientViewModel?> GetPageIntroByPageTypeId(string language, int pageTypeId)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = _appConfig.GetByPageTypeIdPageIntroUrl + pageTypeId;
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
                        PageIntroClientViewModel data = JsonConvert.DeserializeObject<PageIntroClientViewModel>(responseData);
                        return data;
                    }
                }
            }
            return new PageIntroClientViewModel
            {
                Title = "Lulusia",
                Content = ""
            };
        }
    }
}
