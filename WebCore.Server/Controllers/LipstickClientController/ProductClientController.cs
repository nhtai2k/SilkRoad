using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class ProductClientController : ControllerBase
    {
        private readonly IProductClientHelper _productHelper;
        public ProductClientController(IProductClientHelper productHelper)
        {
            _productHelper = productHelper;
        }
        [HttpGet("getAllByCategoryIdAndSubCategoryId/{userId}/{categoryId}/{subCategoryId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAllActive(int userId = -1, int categoryId = -1, int subCategoryId = -1, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetByCategoryIdSubCategoryIdAsync(language, categoryId, subCategoryId, pageIndex, pageSize, userId);
            return Ok(data);
        }
        [HttpGet("getById/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetByIdAsync(language, Id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("getLatestProducts/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetLatestProducts(int userId, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetLatestProductAsync(language, pageIndex, pageSize, userId);
            return Ok(data);
        }
        [HttpGet("getBestSellerProducts/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetBestSellerProducts(int userId, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetBestSellerProductAsync(language, pageIndex, pageSize, userId);
            return Ok(data);
        }
        [HttpGet("getSaleOffProducts/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetSaleOffProducts(int userId, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetSaleOffProductAsync(language, pageIndex, pageSize, userId);
            return Ok(data);
        }
        [HttpGet("getRelatedProducts/{userId}/{productId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetRelatedProducts(int userId, int productId, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetRelatedProductAsync(language, productId, pageIndex, pageSize, userId);
            return Ok(data);
        }
        [HttpGet("getFavoritedProducts/{userId}/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetFavoritedProducts(int userId, int pageIndex = 1, int pageSize = 8)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = await _productHelper.GetFavoriteProductByUserIdAsync(ELanguages.VN.ToString(), userId, pageIndex, pageSize);
            return Ok(data);
        }
    }
}
