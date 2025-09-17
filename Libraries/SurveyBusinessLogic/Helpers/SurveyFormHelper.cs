using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class SurveyFormHelper : ISurveyFormHelper
    {
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IMapper _mapper;
        //private readonly IQuestionGroupLibraryHelper _questionGroupHelper;
        //private readonly IQuestionLibraryHelper _questionHelper;
        //public SurveyFormHelper(
        //    IUnitOfWork unitOfWork,
        //    IMapper mapper,
        //    IQuestionGroupLibraryHelper questionGroupHelper,
        //    IQuestionLibraryHelper questionHelper)
        //{
        //    _unitOfWork = unitOfWork;
        //    _mapper = mapper;
        //    _questionGroupHelper = questionGroupHelper;
        //    _questionHelper = questionHelper;
        //}
        //public async Task<IEnumerable<SurveyFormViewModel>> GetAllAsync()
        //{
        //    IEnumerable<SurveyFormDTO> data = await _unitOfWork.SurveyFormRepository.GetAllAsync(s => s.IsDeleted == false);
        //    return _mapper.Map<IEnumerable<SurveyFormViewModel>>(data);
        //}

        //public async Task<IEnumerable<SurveyFormViewModel>> GetAllActiveAsync()
        //{
        //    IEnumerable<SurveyFormDTO> data = await _unitOfWork.SurveyFormRepository.GetAllAsync(s => s.IsDeleted == false && s.IsActive);
        //    return _mapper.Map<IEnumerable<SurveyFormViewModel>>(data);
        //}
        //public async Task<Pagination<SurveyFormViewModel>> GetAllAsync(int pageIndex, int pageSize)
        //{
        //    Pagination<SurveyFormViewModel> page = new Pagination<SurveyFormViewModel>();
        //    if (pageSize >= 1)
        //        page.PageSize = pageSize;
        //    IEnumerable<SurveyFormDTO> data = await _unitOfWork.SurveyFormRepository.GetAllAsync(s => s.IsDeleted == false);
        //    page.TotalItems = data.Count();
        //    page.TotalPages = (int)Math.Ceiling((double)page.TotalItems / page.PageSize);
        //    page.CurrentPage = pageIndex;
        //    var surveyForms = data.Skip((page.CurrentPage - 1) * page.PageSize).Take(page.PageSize);
        //    page.Items = _mapper.Map<IEnumerable<SurveyFormViewModel>>(surveyForms);
        //    return page;
        //}
        //public async Task<SurveyFormViewModel> GetByIdAsync(int ID)
        //{
        //    var data = await _unitOfWork.SurveyFormRepository.GetByIdAsync(ID);
        //    return _mapper.Map<SurveyFormViewModel>(data);
        //}
        //public SurveyFormViewModel GetEagerSurveyFormByID(int ID)
        //{
        //    var data = _unitOfWork.SurveyFormRepository.GetEagerSurveyFormByID(ID);
        //    return _mapper.Map<SurveyFormViewModel>(data);
        //}

        //public async Task<SurveyUIViewModel> GetEagerSurveyUIByID(int ID, string language)
        //{
        //    var data = _unitOfWork.SurveyFormRepository.GetEagerSurveyFormByID(ID);
        //    if (data == null)
        //        return null;
        //    SurveyFormViewModel surveyFormViewModel = _mapper.Map<SurveyFormViewModel>(data);

        //    SurveyUIViewModel surveyUIViewModel = new SurveyUIViewModel();
        //    surveyUIViewModel.SurveyFormID = surveyFormViewModel.Id;
        //    if (string.Equals(language, ELanguages.VN.ToString()))
        //    {
        //        surveyUIViewModel.Title = surveyFormViewModel.TitleVN;
        //        surveyUIViewModel.Description = surveyFormViewModel.DescriptionVN;
        //    }
        //    else
        //    {
        //        surveyUIViewModel.Title = surveyFormViewModel.TitleEN;
        //        surveyUIViewModel.Description = surveyFormViewModel.DescriptionEN;
        //    }
        //    List<QuestionGroupUIViewModel> questionGroupUIs = await QuestionGroupUI(language, surveyFormViewModel);
        //    surveyUIViewModel.QuestionGroupUIs = questionGroupUIs;
        //    return surveyUIViewModel;
        //}
        //public SurveyFormViewModel GetSurveyFormByID(int ID)
        //{
        //    SurveyFormDTO surveyForm = _unitOfWork.SurveyFormRepository.GetEagerActiveSurverFormByID(ID);
        //    return _mapper.Map<SurveyFormViewModel>(surveyForm);
        //}
        //public async Task<bool> CreateAsync(SurveyFormViewModel model)
        //{
        //    SurveyFormDTO surveyForm = _mapper.Map<SurveyFormDTO>(model);
        //    //surveyForm.CreatedBy = _userInformation.GetUserName();
        //    await _unitOfWork.SurveyFormRepository.CreateAsync(surveyForm);
        //    _unitOfWork.SaveChanges();
        //    //var selectedQuestionList = model.SelectQuestions.Where(s => s.Checked);
        //    //foreach (var item in model.SurveyQuestions)
        //    //{
        //    //    SurveyQuestionDTO selectedQuestion = new SurveyQuestionDTO();
        //    //    selectedQuestion.SurveyFormId = surveyForm.Id;
        //    //    selectedQuestion.QuestionId = item.QuestionID;
        //    //    selectedQuestion.QuestionGroupId = item.QuestionGroupID;
        //    //    selectedQuestion.Priority = item.Priority;
        //    //    _unitOfWork.SurveyQuestionRepository.Create(selectedQuestion);
        //    //}
        //    //_unitOfWork.SaveChanges();
        //    return true;
        //}
        //public async Task<bool> UpdateAsync(SurveyFormViewModel model)
        //{
        //    SurveyFormDTO surveyForm = await _unitOfWork.SurveyFormRepository.GetByIdAsync(model.Id);
        //    if (surveyForm == null)
        //        return false;
        //    surveyForm.TitleEN = model.TitleEN;
        //    surveyForm.TitleVN = model.TitleVN;
        //    surveyForm.DescriptionEN = model.DescriptionEN;
        //    surveyForm.DescriptionVN = model.DescriptionVN;
        //    surveyForm.IsActive = model.IsActive;
        //    surveyForm.StartDate = model.StartDate;
        //    surveyForm.EndDate = model.EndDate;
        //    surveyForm.ModifiedAt = DateTime.Now;
        //    _unitOfWork.SaveChanges();
        //    //surveyForm.ModifiedBy = _userInformation.GetUserName();
        //    _unitOfWork.SurveyFormRepository.RemoveSelectQuestionBySurveyFormID(surveyForm.Id);
        //    //var selectedQuestionList = model.SelectQuestions.Where(s => s.Checked);
        //    //foreach (var item in model.SurveyQuestions)
        //    //{
        //    //    SelectedQuestionDTO selectedQuestion = new SelectedQuestionDTO();
        //    //    selectedQuestion.SurveyFormId = surveyForm.Id;
        //    //    selectedQuestion.QuestionId = item.QuestionID;
        //    //    selectedQuestion.QuestionGroupId = item.QuestionGroupID;
        //    //    selectedQuestion.Priority = item.Priority;
        //    //    _unitOfWork.SurveyQuestionRepository.Create(selectedQuestion);
        //    //}
        //    _unitOfWork.SaveChanges();
        //    return true;
        //}
        //public async Task<bool> SoftDeleteAsync(int ID)
        //{
        //    var surveyForm = await _unitOfWork.SurveyFormRepository.GetByIdAsync(ID);
        //    if (surveyForm != null)
        //    {
        //        surveyForm.IsDeleted = true;
        //        surveyForm.ModifiedAt = DateTime.Now;
        //        //surveyForm.ModifiedBy = _userInformation.GetUserName();
        //        _unitOfWork.SaveChanges();
        //    }

        //    return true;
        //}

        //public Task<bool> DeleteAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<bool> RestoreAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}
        //private async Task<List<QuestionGroupUIViewModel>> QuestionGroupUI(string language, SurveyFormViewModel surveyFormViewModel)
        //{
        //    List<QuestionGroupUIViewModel> questionGroupUIs = new List<QuestionGroupUIViewModel>();

        //    IEnumerable<QuestionGroupViewModel> groupUIViewModels = _questionGroupHelper.GetEagerAllElements();
        //    groupUIViewModels = groupUIViewModels.OrderBy(g => g.Priority);
        //    foreach (var questionGroup in groupUIViewModels)
        //    {
        //        var tasks = new List<Task>();
        //        bool checkQuestionGroup = surveyFormViewModel.SurveyQuestions.Any(s => s.QuestionGroupID == questionGroup.Id);
        //        if (checkQuestionGroup)
        //        {
        //            QuestionGroupUIViewModel tempQuestionGroupUI = new QuestionGroupUIViewModel();
        //            tempQuestionGroupUI.QuestionGroupID = questionGroup.Id;

        //            tempQuestionGroupUI.QuestionGroupName = string.Equals(language, ELanguages.VN.ToString()) ? questionGroup.NameVN : questionGroup.NameEN;

        //            List<SelectedQuestionViewModel> selectedQuestions = surveyFormViewModel.SurveyQuestions.Where(s => s.QuestionGroupID == questionGroup.Id).OrderBy(s => s.Priority).ToList();
        //            selectedQuestions.ForEach(async s =>
        //            {
        //                QuestionViewModel question = await _questionHelper.GetByIdAsync(s.QuestionID);
        //                QuestionUIViewModel tempQuestionUI = new QuestionUIViewModel();
        //                tempQuestionUI.QuestionID = question.Id;
        //                tempQuestionUI.QuestionTypeID = question.QuestionTypeId;
        //                tempQuestionUI.SelectQuestionID = s.ID;
        //                tempQuestionUI.QuestionName = string.Equals(language, ELanguages.VN.ToString()) ? question.NameVN : question.NameEN;

        //                if (question.QuestionTypeId == (int)EQuestionType.Option || question.QuestionTypeId == (int)EQuestionType.OptionOpen)
        //                {
        //                    foreach (var optionAnswer in question.PredefinedAnswers)
        //                    {
        //                        AnswerUIViewModel answerViewModel = new AnswerUIViewModel();
        //                        answerViewModel.ID = optionAnswer.Id;
        //                        answerViewModel.Name = string.Equals(language, ELanguages.VN.ToString()) ? optionAnswer.NameVN : optionAnswer.NameEN;
        //                        answerViewModel.Point = optionAnswer.Point;
        //                        tempQuestionUI.Answers.Add(answerViewModel);
        //                    }
        //                }

        //                tempQuestionGroupUI.QuestionUIs.Add(tempQuestionUI);
        //            });

        //            questionGroupUIs.Add(tempQuestionGroupUI);
        //        }
        //    }

        //    return questionGroupUIs;
        //}
        public Task<bool> CreateAsync(SurveyFormDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SurveyFormDTO>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SurveyFormDTO> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(SurveyFormDTO model)
        {
            throw new NotImplementedException();
        }
    }
}
