using Common;
using Common.ViewModels.SurveyViewModels;
using Newtonsoft.Json;
using System.Text;

namespace Lipstick._Convergence.Services
{
    public class ParticipantService
    {
        private readonly ClientAppConfig _appConfig;
        public ParticipantService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task CreateAsync(SurveyUIViewModel model)
        {
            string baseLink = _appConfig.GetBaseAPIURL();
            string getArticlesUrl = _appConfig.CreateParticipantUrl;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseLink);
                httpClient.DefaultRequestHeaders.Add("X-API-Key", _appConfig.ApiKey);

                HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
                await httpClient.PostAsync(getArticlesUrl, httpContent);
            }
        }
    }
}
