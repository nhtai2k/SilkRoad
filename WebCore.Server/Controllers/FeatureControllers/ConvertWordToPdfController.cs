using Common.Services.ConvertWordToPdfServices;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.FeatureControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConvertWordToPdfController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConvertWordToPdfService _convertWordToPdfService;
        public ConvertWordToPdfController(IWebHostEnvironment webHostEnvironment, IConvertWordToPdfService convertWordToPdfService)
        {
            _webHostEnvironment = webHostEnvironment;
            _convertWordToPdfService = convertWordToPdfService;
        }
        [HttpPost("convertFile")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> ConvertFile([FromForm] IFormFile file)
        {
            try
            {
                // Validate file upload
                if (file == null || file.Length == 0)
                {
                    return BadRequest();
                }

                // Convert the file asynchronously
                var data = await _convertWordToPdfService.ConvertWordToPdfAsync(file);

                if (data == null)
                {
                    //return Failed(EStatusCodes.BadRequest, "Invalid file. Please upload a valid Word document and size under 15 MB.");
                    return StatusCode(500);
                }

                // Generate a meaningful filename
                var originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
                var pdfFileName = $"{originalFileName}_converted.pdf";

                // Return the converted PDF file as a byte array
                return File(data, "application/pdf", pdfFileName);
            }
            catch (Exception ex)
            {
                // Log the exception if you have logging configured
                // _logger.LogError(ex, "Error converting file {FileName}", file?.FileName);

                return StatusCode(500, $"An error occurred during file conversion: {ex.Message}");
            }
        }
    }
}
