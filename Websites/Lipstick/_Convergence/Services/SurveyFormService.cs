using Common;
using Common.ViewModels.SurveyViewModels;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Services
{
    public class SurveyFormService
    {
        private readonly ClientAppConfig _appConfig;
        public SurveyFormService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<SurveyUIViewModel?> GetById(int id)
        {
            string baseUrl = _appConfig.GetBaseAPIURL();
            string url = string.Concat(_appConfig.GetEagerSurveyUIByIdUrl, id);
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseUrl);
                httpClient.DefaultRequestHeaders.Add("X-API-Key", _appConfig.ApiKey);
                HttpResponseMessage response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(responseData))
                    {
                        SurveyUIViewModel data = JsonConvert.DeserializeObject<SurveyUIViewModel>(responseData);
                        return data;
                    }
                }
            }
            return null;
        }
    }
}
