using LipstickBusinessLogic.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchClientController : ControllerBase
    {
        private readonly ISearchClientHelper _searchClientHelper;
        public SearchClientController(ISearchClientHelper searchClientHelper)
        {
            _searchClientHelper = searchClientHelper;
        }
        [HttpGet("suggestProductBySearchText/{searchText}")]
        public async Task<IActionResult> SuggestProductBySearchText(string searchText)
        {
            string language = Request.Headers["Language"].ToString();
            var data = await _searchClientHelper.SuggestProductBySearchTextAsync(language, searchText);
            return Ok(data);
        }
        //get product search result
        [HttpGet("getProductSearchResult/{searchText}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetProductSearchResult(string searchText, int pageIndex, int pageSize)
        {
            if (pageIndex < 1)
                return BadRequest("Page index must be greater than 0");
            string language = Request.Headers["Language"].ToString();
            var data = await _searchClientHelper.GetProductSearchResultAsync(language, searchText, pageIndex, pageSize);
            return Ok(data);
        }
    }
}
