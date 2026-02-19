using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;

namespace System.Share.Services.ConvertWordToPdfServices
{
    public class ConvertWordToPdfService : IConvertWordToPdfService
    {
        private readonly ServerAppConfig _appConfig;
        public ConvertWordToPdfService(ServerAppConfig appConfig)
        {
            _appConfig = appConfig;
        }
        public async Task<byte[]?> ConvertWordToPdfAsync(IFormFile file)
        {
            try
            {
                if (!ValidateFile(file))
                {
                    return null;
                }

                string aliasUrl = _appConfig.ConvertWordToPdfUrl;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_appConfig.PythonServiceUrl);

                    // Set timeout for large file processing
                    client.Timeout = TimeSpan.FromMinutes(10);

                    using (var dataContent = new MultipartFormDataContent())
                    {
                        // Use the IFormFile's OpenReadStream() method to get the file content
                        using (var fileStream = file.OpenReadStream())
                        {
                            var streamContent = new StreamContent(fileStream);

                            // Set appropriate content type based on file extension
                            var contentType = Path.GetExtension(file.FileName).ToLowerInvariant() switch
                            {
                                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                ".doc" => "application/msword",
                                _ => "application/octet-stream"
                            };

                            streamContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                            streamContent.Headers.ContentLength = file.Length;

                            dataContent.Add(streamContent, "file", file.FileName);

                            var response = await client.PostAsync(aliasUrl, dataContent);

                            if (response.IsSuccessStatusCode)
                            {
                                return await response.Content.ReadAsByteArrayAsync();
                            }
                            else
                            {
                                var errorContent = await response.Content.ReadAsStringAsync();
                                throw new HttpRequestException($"Conversion failed with status {response.StatusCode}: {errorContent}");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception here if you have a logger
                // _logger.LogError(ex, "Error converting Word to PDF for file: {FileName}", file?.FileName);
                throw; // Re-throw without losing stack trace
            }
        }

        private bool ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return false;
            }

            var allowedExtensions = new[] { ".docx", ".doc" };
            var fileExtension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
            var maxFileSize = 15 * 1024 * 1024; // 15 MB

            return allowedExtensions.Contains(fileExtension) && file.Length <= maxFileSize;
        }
    }
}
