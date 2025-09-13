using Common;
using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using Lipstick._Convergence.Hubs;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Text;

namespace Lipstick._Convergence.Services
{
    public class OrderService
    {
        private readonly ClientAppConfig _appConfig;
        private readonly IHubContext<PaymentHub> _paymentHub;
        public OrderService(ClientAppConfig appConfig, IHubContext<PaymentHub> paymentHub)
        {
            _appConfig = appConfig;
            _paymentHub = paymentHub;
        }
        public async Task<string?> CreateAsync(OrderClientViewModel model)
        {
            string baseLink = _appConfig.GetBaseAPIURL();
            string getArticlesUrl = _appConfig.CreateOrderUrl;
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(baseLink);
                httpClient.DefaultRequestHeaders.Add("X-API-Key", _appConfig.ApiKey);

                HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
                HttpResponseMessage response = await httpClient.PostAsync(getArticlesUrl, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    string data = await response.Content.ReadAsStringAsync();
                    DataObjectResult dataObjectResult = JsonConvert.DeserializeObject<DataObjectResult>(data);
                    if (dataObjectResult != null && dataObjectResult.OK)
                    {
                        return dataObjectResult.Data;
                    }
                    return null;
                }
            }
            return null;
        }
        
        public  void NotifyPaymentStatus(SepayModel model)
        {
            string obj = JsonConvert.SerializeObject(model);
            _paymentHub.Clients.All.SendAsync("ReceivePaymentStatus", obj);
        }
        //public async Task<Pagination<OrderClientViewModel>?> GetOrderHistoriesByMemberId(string userId = "-1", int pageIndex = 1, int pageSize = 10)
        //{
        //    string baseUrl = _appConfig.GetBaseAPIURL();
        //    string url = _appConfig.GetOrderByMemberIdUrl + userId + "/" + pageIndex + "/" + pageSize;
        //    using (HttpClient httpClient = new HttpClient())
        //    {
        //        httpClient.BaseAddress = new Uri(baseUrl);
        //        httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
        //        //httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

        //        HttpResponseMessage response = await httpClient.GetAsync(url);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            string responseData = await response.Content.ReadAsStringAsync();
        //            if (!string.IsNullOrEmpty(responseData))
        //            {
        //                Pagination<OrderClientViewModel> data = JsonConvert.DeserializeObject<Pagination<OrderClientViewModel>>(responseData);
        //                return data;
        //            }
        //        }
        //    }
        //    return null;
        //}
        //public async Task<Pagination<OrderClientViewModel>?> GetOrderHistoriesByPhoneNumber(string phoneNumber = "", int pageIndex = 1, int pageSize = 10)
        //{
        //    string baseUrl = _appConfig.GetBaseAPIURL();
        //    string url = _appConfig.GetOrderByPhoneNumberUrl + phoneNumber + "/" + pageIndex + "/" + pageSize;
        //    using (HttpClient httpClient = new HttpClient())
        //    {
        //        httpClient.BaseAddress = new Uri(baseUrl);
        //        httpClient.DefaultRequestHeaders.Add(Constants.ApiKeyHeaderName, _appConfig.ApiKey);
        //        //httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

        //        HttpResponseMessage response = await httpClient.GetAsync(url);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            string responseData = await response.Content.ReadAsStringAsync();
        //            if (!string.IsNullOrEmpty(responseData))
        //            {
        //                Pagination<OrderClientViewModel> data = JsonConvert.DeserializeObject<Pagination<OrderClientViewModel>>(responseData);
        //                return data;
        //            }
        //        }
        //    }
        //    return null;
        //}
        //public async Task<OrderClientViewModel?> GetById(string language, int id)
        //{
        //    string baseUrl = _appConfig.GetBaseAPIURL();
        //    string url = string.Concat(_appConfig.GetOrderByIdUrl, id);
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
        //                OrderClientViewModel data = JsonConvert.DeserializeObject<OrderClientViewModel>(responseData);
        //                return data;
        //            }
        //        }
        //    }
        //    return null;
        //}
        //public async Task<List<CartClientViewModel>> GetOrderHistoryItemListAsync(List<CartItemModel> items, string language)
        //{
        //    string baseLink = _appConfig.GetBaseAPIURL();
        //    string getArticlesUrl = _appConfig.GetOrderHistoryItemListUrl;
        //    using (HttpClient httpClient = new HttpClient())
        //    {
        //        httpClient.BaseAddress = new Uri(baseLink);
        //        httpClient.DefaultRequestHeaders.Add("X-API-Key", _appConfig.ApiKey);
        //        httpClient.DefaultRequestHeaders.Add(Constants.Language, language);

        //        HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(items), Encoding.UTF8, "application/json");
        //        HttpResponseMessage response = await httpClient.PostAsync(getArticlesUrl, httpContent);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            List<CartClientViewModel> data = JsonConvert.DeserializeObject<List<CartClientViewModel>>(await response.Content.ReadAsStringAsync());
        //            return data;
        //        }
        //    }
        //    return null;
        //}

    }
}
