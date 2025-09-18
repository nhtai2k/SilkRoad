namespace SurveyDataAccess.DTOs
{
    public class PredefinedAnswerLibraryDTO
    {
        public Guid Id { get; set; }
        public int QuestionLibraryId { get; set; }
        public required string NameVN { get; set; }
        public required string NameEN { get; set; }
        public QuestionLibraryDTO? Question { get; set; }
    }
}
