using System.Net.Http.Headers;
using System.Share.ViewModels.QRViewModels;
using System.Text.Json;

namespace System.Share.Services.QRCodeServices
{
    public class QRCodeService : IQRCodeService
    {
        private readonly ServerAppConfig _appConfig;
        public QRCodeService(ServerAppConfig appConfig)
        {
            _appConfig = appConfig;
        }

        public async Task<List<string>> GetAllFontsAsync()
        {
            try
            {
                string baseUrl = _appConfig.PythonServiceUrl;
                string aliasUrl = _appConfig.GetAllFontsUrl;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    var response = await client.GetAsync(aliasUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var fonts = JsonSerializer.Deserialize<List<string>>(result);
                        return fonts ?? new List<string>();
                    }
                    else
                    {
                        throw new Exception("Error");
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public async Task<byte[]> Base64QRCodeImageAsync(QRCodeViewModel model)
        {
            try
            {
                string baseUrl = _appConfig.PythonServiceUrl;
                string aliasUrl = _appConfig.GenerateQrCodeUrl;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    MultipartFormDataContent dataContent = new MultipartFormDataContent();
                    dataContent.Add(new StringContent(model.Content), "Content");
                    dataContent.Add(new StringContent(model.Size.ToString()), "Size");
                    dataContent.Add(new StringContent(model.FontSize.ToString()), "FontSize");
                    dataContent.Add(new StringContent(model.TextColor), "TextColor");
                    dataContent.Add(new StringContent(model.BackgroundColor), "BackgroundColor");
                    dataContent.Add(new StringContent(model.FillColor), "FillColor");
                    dataContent.Add(new StringContent(model.Border.ToString()), "Border");
                    if (model.Text != null)
                    {
                        dataContent.Add(new StringContent(model.Text), "Text");
                    }
                    if (model.FontFamily != null)
                    {
                        dataContent.Add(new StringContent(model.FontFamily), "FontFamily");
                    }
                    if (model.Logo != null)
                    {
                        dataContent.Add(new StreamContent(model.Logo.OpenReadStream())
                        {
                            Headers =
                            {
                                ContentLength = model.Logo.Length,
                                ContentType = new MediaTypeHeaderValue(model.Logo.ContentType)
                            }
                        }, "Logo", "logoImage");
                    }

                    //var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
                    var response = await client.PostAsync(aliasUrl, dataContent);
                    if (response.IsSuccessStatusCode)
                    {
                        return await response.Content.ReadAsByteArrayAsync();
                    }
                    else
                    {
                        throw new Exception("Error");
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
