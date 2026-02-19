using AutoMapper;
using System.Share.ViewModels.VOCViewModelModels;
using VOC.BLL.IHelpers;
using VOC.DAL;
using VOC.DAL.DTOs;

namespace VOC.BLL.Helpers
{
    public class FeedbackPriorityHelper : IFeedbackPriorityHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FeedbackPriorityHelper(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<FeedbackPriorityViewModel>> GetAllAsync()
        {
            var data = await _unitOfWork.FeedbackPriorityRepository.GetAllAsync(orderBy: s => s.OrderBy(p => p.Priority));
            return _mapper.Map<IEnumerable<FeedbackPriorityViewModel>>(data);
        }

        public async Task<FeedbackPriorityViewModel> GetByIdAsync(int id)
        {
            var data = await _unitOfWork.FeedbackPriorityRepository.GetByIdAsync(id);
            return _mapper.Map<FeedbackPriorityViewModel>(data);
        }

        public async Task UpdateAsync(FeedbackPriorityViewModel model)
        {
            var data = _mapper.Map<FeedbackPriorityDTO>(model);
            await _unitOfWork.FeedbackPriorityRepository.UpdateAsync(data);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
