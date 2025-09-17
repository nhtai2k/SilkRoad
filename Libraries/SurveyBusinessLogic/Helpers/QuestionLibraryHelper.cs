using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionLibraryHelper : IQuestionLibraryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public QuestionLibraryHelper(IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<QuestionViewModel>> GetAllAsync()
        {
            //IEnumerable<QuestionLibraryDTO> data = await _unitOfWork.QuestionRepository.GetAllAsync(filter: s => !s.IsDeleted);
            //return _mapper.Map<IEnumerable<QuestionViewModel>>(data);
            throw new NotImplementedException();

        }
        public async Task<Pagination<QuestionViewModel>> GetAllAsync(int questionGroupID, int pageIndex, int pageSize)
        {
            //Pagination<QuestionViewModel> page = new Pagination<QuestionViewModel>();
            //if (pageSize >= 1)
            //{
            //    page.PageSize = pageSize;
            //}
            //IEnumerable <QuestionLibraryDTO> data = await _unitOfWork.QuestionRepository
            //    .GetAllAsync(filter: s => questionGroupID == -1 ? !s.IsDeleted : s.QuestionGroupId == questionGroupID && !s.IsDeleted,
            //    orderBy: p => p.OrderByDescending(s => s.ModifiedAt));
            //page.TotalItems = data.Count();
            //page.CurrentPage = pageIndex;
            //page.TotalPages = (int)Math.Ceiling((double)page.TotalItems / pageSize);
            //var questions = data.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            //page.Items = _mapper.Map<IEnumerable<QuestionViewModel>>(questions);
            //return page;
            throw new NotImplementedException();

        }
        public async Task<QuestionViewModel> GetByIdAsync(int id)
        {
            //var data = _unitOfWork.QuestionRepository.GetEagerQuestionById(id);
            //if (data == null)
            //{
            //    return null;
            //}
            //QuestionViewModel questionViewModel = _mapper.Map<QuestionViewModel>(data);
            ////questionViewModel.IsEdited = _unitOfWork.SurveyQuestionRepository.CheckExistenceByQuestionID(id);
            //return questionViewModel;
            throw new NotImplementedException();

        }
        public async Task<bool> CreateAsync(QuestionViewModel model)
        {
            //QuestionLibraryDTO question = _mapper.Map<QuestionLibraryDTO>(model);
            //await _unitOfWork.QuestionRepository.CreateAsync(question);
            //_unitOfWork.SaveChanges();
            //question.PredefinedAnswerLibraries.ToList().ForEach(s =>
            //{
            //    s.QuestionId = question.Id;
            //    _unitOfWork.PredefinedAnswerRepository.Create(s);
            //});
            //await _unitOfWork.SaveChangesAsync();
            //return true;
            throw new NotImplementedException();

        }
        public async Task<bool> UpdateAsync(QuestionViewModel model)
        {
            //QuestionLibraryDTO question = _unitOfWork.QuestionRepository.GetEagerQuestionById(model.Id);
            //if (question == null)
            //    return false;

            //question.NameVN = model.NameVN;
            //question.NameEN = model.NameEN;
            //question.ChartLabel = model.ChartLabel;
            //question.Note = model.Description;
            //question.ModifiedAt = DateTime.Now;
            //question.QuestionGroupId = model.QuestionGroupId;
            //question.QuestionTypeId = model.QuestionTypeId;

            //var optionAnswers = question.PredefinedAnswerLibraries.ToList();
            //optionAnswers.ForEach(s =>
            //{
            //    _unitOfWork.PredefinedAnswerRepository.Delete(s);
            //});
            //foreach (var item in model.PredefinedAnswers)
            //{
            //    PredefinedAnswerLibraryDTO predefinedAnswer = _mapper.Map<PredefinedAnswerLibraryDTO>(item);
            //    predefinedAnswer.QuestionId = model.Id;
            //    _unitOfWork.PredefinedAnswerRepository.Create(predefinedAnswer);

            //}
            //await _unitOfWork.SaveChangesAsync();
            //return true;
            throw new NotImplementedException();

        }

        public async Task<bool> SoftDeleteAsync(int ID)
        {
            //// Is question existed?
            //bool checkExist = _unitOfWork.SurveyQuestionRepository.CheckExistenceByQuestionID(ID);
            //// The question is existed!
            //if (checkExist)
            //{
            //    return false;
            //}

            //var employee = await _unitOfWork.QuestionRepository.GetByIdAsync(ID);
            //if (employee != null)
            //{
            //    employee.IsDeleted = true;
            //    employee.ModifiedAt = DateTime.Now;
            //    //employee.ModifiedBy = _userInformation.GetUserName();
            //    _unitOfWork.SaveChanges();
            //}
            //return true;
            throw new NotImplementedException();

        }


        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
