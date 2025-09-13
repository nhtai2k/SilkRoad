using System.Text;
using Common;
using Common.ViewModels.LipstickClientViewModels;
using Newtonsoft.Json;

namespace Lipstick._Convergence.Services
{
    public class CartService
    {
        private readonly ClientAppConfig _appConfig;
        public CartService(ClientAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<CartClientViewModel> GetCartAsync(List<CartItemModel> items, string language)
        {
            string baseLink = _appConfig.GetBaseAPIURL();
            string getArticlesUrl = _appConfig.GetCartUrl;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseLink);
                httpClient.DefaultRequestHeaders.Add("X-API-Key", _appConfig.ApiKey);
                httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

                HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(items), Encoding.UTF8, "application/json");
                HttpResponseMessage response = await httpClient.PostAsync(getArticlesUrl, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    CartClientViewModel data = JsonConvert.DeserializeObject<CartClientViewModel>(await response.Content.ReadAsStringAsync());
                    return data;
                }
            }
            return null;
        }
    }
}
