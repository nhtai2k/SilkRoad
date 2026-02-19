using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.Custom.ApiKey;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class BlogClientController : ControllerBase
    {
        private readonly IBlogClientHelper _blogHelper;
        public BlogClientController(IBlogClientHelper blogHelper)
        {
            _blogHelper = blogHelper;
        }
        [HttpGet("getAllActive")]
        public IActionResult GetAllActive()
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _blogHelper.GetAllActive(language);
            return Ok(data);
        }
        [HttpGet("getLatestBlogs/{numberOfBlog}")]
        public IActionResult GetLatestBlogs(int numberOfBlog)
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _blogHelper.GetLatestBlogs(language, numberOfBlog);
            return Ok(data);
        }
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _blogHelper.GetById(language, id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("getByTopicId/{topicId}/{pageIndex}/{pageSize}")]
        public IActionResult GetByTopicId(int topicId, int pageIndex, int pageSize)
        {
            string language = Request.Headers[Constants.Language].ToString();
            var data = _blogHelper.GetByTopicId(language, topicId, pageIndex, pageSize);
            return Ok(data);
        }
    }
}
