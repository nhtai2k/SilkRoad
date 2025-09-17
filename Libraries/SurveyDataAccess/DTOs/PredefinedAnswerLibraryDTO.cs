namespace SurveyDataAccess.DTOs
{
    public class PredefinedAnswerLibraryDTO
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public required string NameVN { get; set; }
        public required string NameEN { get; set; }
        public QuestionLibraryDTO? Question { get; set; }
    }
}
