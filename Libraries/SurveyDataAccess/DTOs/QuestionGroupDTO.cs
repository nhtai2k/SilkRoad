namespace SurveyDataAccess.DTOs
{
    public class QuestionGroupDTO
    {
        public Guid Id { get; set; }
        public int SurveyFormId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public int Priority { get; set; }
        public ICollection<QuestionDTO> Questions { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
        public QuestionGroupDTO()
        {
            Questions = new List<QuestionDTO>();
        }
    }
}
