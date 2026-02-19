namespace Survey.DAL.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public Guid? QuestionGroupId { get; set; }
        public int? SurveyFormId { get; set; }
        public int QuestionTypeId { get; set; }
        public int Priority { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public QuestionTypeDTO? QuestionType { get; set; }
        public QuestionGroupDTO? QuestionGroup { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
        public ICollection<PredefinedAnswerDTO> PredefinedAnswers { get; set; }
        public QuestionDTO()
        {
            PredefinedAnswers = new List<PredefinedAnswerDTO>();
        }

    }
}
