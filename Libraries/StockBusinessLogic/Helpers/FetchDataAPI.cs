using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using StockBusinessLogic.Models;

namespace StockBusinessLogic.Helpers
{
    public class FetchDataAPI
    {
        public async Task<FetchStockHistoryViewModel> FetchData(string symbol, string from, string to)
        {
            string url = $"https://dchart-api.vndirect.com.vn/dchart/history?resolution=1D&symbol={symbol}&from={from}&to={to}";
            using (HttpClient httpClient = new HttpClient())
            {
                //HttpResponseMessage response = await httpClient.GetAsync(url);
                //if (response.IsSuccessStatusCode)
                //{
                //    var data = await response.Content.ReadAsStringAsync();
                //    FetchStockHistoryViewModel fetchStockHistoryViewModel = JsonConvert.DeserializeObject<FetchStockHistoryViewModel>(data);
                //    return fetchStockHistoryViewModel;
                //}
                var req = new HttpRequestMessage(HttpMethod.Get, url);
                req.Headers.Add("User-Agent",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36");

                req.Headers.Add("Accept", "application/json,text/plain,*/*");
                req.Headers.Add("Referer", "https://dchart-api.vndirect.com.vn/");
                req.Headers.Add("Connection", "keep-alive");
                req.Headers.Add("Accept-Encoding", "gzip, deflate, br");

                var response = await httpClient.SendAsync(req);
                if (response.IsSuccessStatusCode)
                {
                var content = await response.Content.ReadAsStringAsync();
                FetchStockHistoryViewModel fetchStockHistoryViewModel = JsonConvert.DeserializeObject<FetchStockHistoryViewModel>(content);
                return fetchStockHistoryViewModel;
                }
            }
            return null;
        }
    }
}
