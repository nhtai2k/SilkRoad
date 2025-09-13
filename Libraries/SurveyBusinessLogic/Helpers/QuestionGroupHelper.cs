using AutoMapper;
using Common.Models;
using Common.ViewModels.SurveyViewModels;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionGroupHelper : IQuestionGroupHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public QuestionGroupHelper(IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<QuestionGroupViewModel>> GetAllAsync()
        {
            IEnumerable<QuestionGroupDTO> data = await _unitOfWork.QuestionGroupRepository.
                GetAllAsync(filter: s => !s.IsDeleted, orderBy: p => p.OrderBy(s => s.ModifiedOn));
            return _mapper.Map<IEnumerable<QuestionGroupViewModel>>(data);
        }

        public async Task<IEnumerable<QuestionGroupViewModel>> GetAllByActiveAsync(bool getActive = false)
        {
            IEnumerable<QuestionGroupDTO> data = await _unitOfWork.QuestionGroupRepository.
                GetAllAsync(filter: s => !s.IsDeleted && (getActive ? s.IsActive : true), orderBy: p => p.OrderBy(s => s.ModifiedOn));
            return _mapper.Map<IEnumerable<QuestionGroupViewModel>>(data);
        }
        public IEnumerable<QuestionGroupViewModel> GetEagerAllElements(bool getActive = false)
        {
            IEnumerable<QuestionGroupDTO> data = _unitOfWork.QuestionGroupRepository.GetEagerAllElements();
            data = data.Where(s => s.Questions.Count > 0 && (getActive ? s.IsActive : true));
            return _mapper.Map<IEnumerable<QuestionGroupViewModel>>(data);
        }
        public async Task<QuestionGroupViewModel> GetByIdAsync(int id)
        {
            var data = await _unitOfWork.QuestionGroupRepository.GetByIdAsync(id);
            return _mapper.Map<QuestionGroupViewModel>(data);
        }
        public QuestionGroupViewModel GetEagerQuestionGroupByID(int ID)
        {
            var data = _unitOfWork.QuestionGroupRepository.GetEagerQuestionGroupById(ID);
            return _mapper.Map<QuestionGroupViewModel>(data);
        }
        public async Task<bool> CreateAsync(QuestionGroupViewModel model)
        {
            QuestionGroupDTO questionGroup = _mapper.Map<QuestionGroupDTO>(model);
            await _unitOfWork.QuestionGroupRepository.CreateAsync(questionGroup);
            _unitOfWork.SaveChanges();
            return true;
        }
        public async Task<bool> UpdateAsync(QuestionGroupViewModel model)
        {
            QuestionGroupDTO questionGroup = await _unitOfWork.QuestionGroupRepository.GetByIdAsync(model.Id);
            questionGroup.NameEN = model.NameEN;
            questionGroup.NameVN = model.NameVN;
            questionGroup.Description = model.Description;
            questionGroup.Priority = model.Priority;
            questionGroup.ModifiedOn = DateTime.Now;
            questionGroup.IsActive = model.IsActive;

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(int ID)
        {
            // Is questionGroup existed? table SelectQuestion
            bool checkExist = _unitOfWork.SurveyQuestionRepository.CheckExistenceByQuestionGroupID(ID);
            // Is questionGroup existed? table Question
            bool checkExistQuestion = _unitOfWork.QuestionRepository.CheckExistenceByQuestionGroupId(ID);

            // The questionGroup is existed!
            if (checkExist || checkExistQuestion)
            {
                return false;
            }

            var questionGroup = await _unitOfWork.QuestionGroupRepository.GetByIdAsync(ID);
            if (questionGroup != null)
            {
                questionGroup.IsDeleted = true;
                questionGroup.ModifiedOn = DateTime.Now;
                //questionGroup.ModifiedBy = _userInformation.GetUserName();
                _unitOfWork.SaveChanges();
            }
            return true;
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Pagination<QuestionGroupViewModel>> GetAllAsync(int pageIndex, int pageSize, bool getActive = false)
        {
            Pagination<QuestionGroupViewModel> page = new Pagination<QuestionGroupViewModel>();
            if (pageSize >= 1)
            {
                page.PageSize = pageSize;
            }
            IEnumerable<QuestionGroupDTO> data = await _unitOfWork.QuestionGroupRepository.GetAllAsync(filter: s =>
                !s.IsDeleted &&
                (getActive ? s.IsActive : true),
                orderBy: p => p.OrderBy(s => s.ModifiedOn));
            page.TotalItems = data.Count();
            page.PageSize = pageSize;
            page.CurrentPage = pageIndex;
            page.TotalPages = (int)Math.Ceiling((double)page.TotalItems / pageSize);
            var questionGroups = data.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            page.Items = _mapper.Map<IEnumerable<QuestionGroupViewModel>>(questionGroups);
            return page;
        }
    }
}
