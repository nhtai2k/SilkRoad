using Common.Models;
using Common.ViewModels.LipstickClientViewModels;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface IBlogClientHelper
    {
        public IEnumerable<BlogClientViewModel> GetAllActive(string language);
        public IEnumerable<BlogClientViewModel> GetLatestBlogs(string language, int numberOfLatest);
        public BlogClientViewModel? GetById(string language, int id);
        public Pagination<BlogClientViewModel> GetByTopicId(string language, int topicId,  int pageIndex, int pageSize);

    }
}
