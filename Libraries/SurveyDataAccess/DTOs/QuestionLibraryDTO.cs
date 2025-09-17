namespace SurveyDataAccess.DTOs
{
    public class QuestionLibraryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? QuestionGroupId { get; set; }
        public int QuestionTypeId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public string? Note { get; set; }
        public QuestionTypeDTO? QuestionType { get; set; }
        public QuestionGroupLibraryDTO? QuestionGroupLibrary { get; set; }
        public ICollection<PredefinedAnswerLibraryDTO>? PredefinedAnswerLibraries { get; set; }
    }
}
