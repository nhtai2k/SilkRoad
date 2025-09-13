using Common;
using Common.Models;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Lipstick.Controllers
{
    public class ProductController : Controller
    {
        #region Contructor
        private readonly LayoutHelper _layoutHelper;
        private readonly CategoryService _categoryService;
        private readonly ProductService _productService;
        public ProductController(LayoutHelper layoutHelper, CategoryService categoryService, ProductService productService)
        {
            _layoutHelper = layoutHelper;
            _categoryService = categoryService;
            _productService = productService;
        }
        #endregion
        #region UI
        /// <summary>
        /// Product page
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="subCategoryId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<IActionResult> Index(int categoryId = -1, int subCategoryId = -1, int pageIndex = 1, int pageSize = 8)
        {
            var userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
            string languageCode = Global.GetLanguageCode(Request);
            var data = await _productService.GetByCategoryIdAndSubCategoryId(languageCode, categoryId, subCategoryId, userId, pageIndex, pageSize);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Product);
            ViewBag.Categories = await _categoryService.GetMenu(languageCode);
            ViewBag.CategoryId = categoryId;
            ViewBag.SubCategoryId = subCategoryId;
            return View(data);
        }
        public async Task<IActionResult> Detail(int Id)
        {
            string languageCode = Global.GetLanguageCode(Request);
            var userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
            var data = await _productService.GetById(languageCode, Id);
            if (data == null)
                return NotFound();
            var relatedProducts = await _productService.GetRelatedProduct(languageCode, Id, userId);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            ViewBag.RelatedProducts = relatedProducts.Items;
            return View(data);
        }
        #endregion
        #region Ajax
        [HttpGet]
        public async Task<IActionResult> GetData(int categoryId, int subCategoryId, int pageIndex, int pageSize)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            var userId = User.Claims.FirstOrDefault()?.Value ?? "-1";
            var data = await _productService.GetByCategoryIdAndSubCategoryId(languageCode, categoryId, subCategoryId, userId, pageIndex, pageSize);
            if (data != null)
            {
                result.OK = true;     
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_ProductListPartialView", data.Items);
                return Ok(result);
            }
            return Ok(result);
        }
        #endregion
    }
}
