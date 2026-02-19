using AutoMapper;
using System.Share.ViewModels.VOCViewModelModels;
using VOC.BLL.IHelpers;
using VOC.DAL;
using VOC.DAL.DTOs;

namespace VOC.BLL.Helpers
{
    public class FeedbackStatusHelper : IFeedbackStatusHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FeedbackStatusHelper(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<FeedbackStatusViewModel>> GetAllAsync()
        {
            var feedbackStatuses = await _unitOfWork.FeedbackStatusRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<FeedbackStatusViewModel>>(feedbackStatuses);
        }

        public async Task<FeedbackStatusViewModel> GetByIdAsync(int id)
        {
            var feedbackStatus = await _unitOfWork.FeedbackStatusRepository.GetByIdAsync(id);
            return _mapper.Map<FeedbackStatusViewModel>(feedbackStatus);
        }

        public async Task UpdateAsync(FeedbackStatusViewModel model)
        {
            var feedbackStatus = _mapper.Map<FeedbackStatusDTO>(model);
            await _unitOfWork.FeedbackStatusRepository.UpdateAsync(feedbackStatus);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
