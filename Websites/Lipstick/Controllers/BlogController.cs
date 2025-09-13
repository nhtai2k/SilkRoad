using Common;
using Common.Models;
using Lipstick._Convergence.Helpers;
using Lipstick._Convergence.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Lipstick.Controllers
{
    public class BlogController : Controller
    {
        private readonly LayoutHelper _layoutHelper;
        private readonly BlogService _blogService;
        private readonly TopicService _topicService;
        public BlogController(LayoutHelper layoutHelper, BlogService blogService, TopicService topicService)
        {
            _layoutHelper = layoutHelper;
            _blogService = blogService;
            _topicService = topicService;
        }
        public async Task<IActionResult> Index(int topicId = -1, int pageIndex = 1, int pageSize = 5)
        {
            string languageCode = Global.GetLanguageCode(Request);
            var data = await _blogService.GetByTopicId(languageCode, topicId, pageIndex, pageSize);
            var topics = await _topicService.GetAllActive(languageCode);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode, (int)EPageTypes.Blog);
            ViewBag.LastestBlogs = await _blogService.GetLatestBlogs(languageCode);
            ViewBag.Topics = new SelectList(topics, "Id", "Name", topicId);
            return View(data);
        }
        public async Task<IActionResult> Details(int id)
        {
            string languageCode = Global.GetLanguageCode(Request);
            ViewBag.Layout = await _layoutHelper.GetLayoutAsync(languageCode);
            var data = await _blogService.GetById(languageCode, id);
            return View(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetData(int topicId, int pageIndex, int pageSize)
        {
            DataObjectResult result = new DataObjectResult();
            string languageCode = Global.GetLanguageCode(Request);
            var data = await _blogService.GetByTopicId(languageCode, topicId, pageIndex, pageSize);
            if (data != null)
            {
                result.OK = true;
                result.Data = Global.RenderRazorViewToString(this, "PartialViews/_BlogListPartialView", data.Items);
                return Ok(result);
            }
            return Ok(result);
        }
    }
}
