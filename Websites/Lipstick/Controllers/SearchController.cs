using Common;
using System.Drawing.Printing;
using Common.Models;
using Microsoft.AspNetCore.Mvc;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;

namespace Lipstick.Controllers
{
    public class SearchController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        private readonly SearchService _searchService;
        private readonly CategoryService _categoryService;
        public SearchController(LayoutHelper layoutHelper, SearchService searchService, CategoryService categoryService)
        {
            _layoutHelper = layoutHelper;
            _searchService = searchService;
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> Index(string search, int pageIndex = 1, int pageSize = 8)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            var data = await _searchService.GetProductSearchResult(languageCode, search, pageIndex, pageSize);
            if (data == null)
            {
                return NotFound();
            }
            ViewBag.Categories = await _categoryService.GetMenu(languageCode);
            ViewBag.SearchText = search;
            return View(data);
        }
        [HttpGet]
        public async Task<IActionResult> AutoComplete(string search)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            var data = await _searchService.GetSuggestProductBySearchText(languageCode, search);
            if (data != null)
            {
                result.OK = true;
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_SearchProductPartialView", data);
                return Ok(result);
            }

            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetData(string search, int pageIndex = 1, int pageSize = 8)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            var data = await _searchService.GetProductSearchResult(languageCode, search, pageIndex, pageSize);
            if (data != null)
            {
                result.OK = true;
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_ProductListPartialView", data.Items);
                return Ok(result);
            }
            return Ok(result);
        }
    }
}
