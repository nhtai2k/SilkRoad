using Common;
using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using Common.ViewModels.LipstickViewModels;
using LipstickBusinessLogic.ILipstickClientHelpers;
using LipstickDataAccess;
using MongoDB.Driver.Linq;

namespace LipstickBusinessLogic.LipstickClientHelpers
{
    public class BlogClientHelper : IBlogClientHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _appConfig;
        public BlogClientHelper(IUnitOfWork unitOfWork, ServerAppConfig appConfig)
        {
            _unitOfWork = unitOfWork;
            _appConfig = appConfig;
        }
        public IEnumerable<BlogClientViewModel> GetAllActive(string language)
        {
            var data = _unitOfWork.BlogRepository.GetAll(x => x.IsActive && !x.IsDeleted).Select(x => new BlogClientViewModel
            {
                Id = x.Id,
                TopicId = x.TopicId,
                Subject = language == ELanguages.VN.ToString() ? x.SubjectVN : x.SubjectEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Content = language == ELanguages.VN.ToString() ? x.ContentVN : x.ContentEN,
                AvatarUrl = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/")
            });
            return data;
        }

        public BlogClientViewModel? GetById(string language, int id)
        {
            var data = _unitOfWork.BlogRepository.GetById(id);
            if (data == null)
            {
                return null;
            }
            return new BlogClientViewModel
            {
                Id = data.Id,
                TopicId = data.TopicId,
                Subject = language == ELanguages.VN.ToString() ? data.SubjectVN : data.SubjectEN,
                Description = language == ELanguages.VN.ToString() ? data.DescriptionVN : data.DescriptionEN,
                Content = language == ELanguages.VN.ToString() ? data.ContentVN : data.ContentEN,
                AvatarUrl = string.Concat(_appConfig.ServerUrl, data.Avatar).Replace(@"\", @"/")
            };
        }

        public Pagination<BlogClientViewModel> GetByTopicId(string language, int topicId,  int pageIndex, int pageSize)
        {
            var model = new Pagination<BlogClientViewModel>();
            if (pageSize > 0)
                model.PageSize = pageSize;
            var data = _unitOfWork.BlogRepository.GetAll(x => x.IsActive && !x.IsDeleted && (topicId == -1 ? true : x.TopicId == topicId)).Select(x => new BlogClientViewModel
            {
                Id = x.Id,
                TopicId = x.TopicId,
                Subject = language == ELanguages.VN.ToString() ? x.SubjectVN : x.SubjectEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Content = language == ELanguages.VN.ToString() ? x.ContentVN : x.ContentEN,
                AvatarUrl = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/")
            });
            model.TotalItems = data.Count();
            model.CurrentPage = pageIndex;
            model.TotalPages = (int)Math.Ceiling(model.TotalItems / (double)model.PageSize);

            data = data.Skip((pageIndex - 1) * model.PageSize).Take(model.PageSize);
            model.Items = data;
            return model;
        }

        public IEnumerable<BlogClientViewModel> GetLatestBlogs(string language, int numberOfLatest)
        {
            var data = _unitOfWork.BlogRepository.GetAll(filter: x => x.IsActive && !x.IsDeleted, orderBy: p => p.OrderByDescending(s => s.CreatedOn)).Take(numberOfLatest).Select(x => new BlogClientViewModel
            {
                Id = x.Id,
                TopicId = x.TopicId,
                Subject = language == ELanguages.VN.ToString() ? x.SubjectVN : x.SubjectEN,
                Description = language == ELanguages.VN.ToString() ? x.DescriptionVN : x.DescriptionEN,
                Content = language == ELanguages.VN.ToString() ? x.ContentVN : x.ContentEN,
                AvatarUrl = string.Concat(_appConfig.ServerUrl, x.Avatar).Replace(@"\", @"/")
            });
            return data;
        }
    }
}
