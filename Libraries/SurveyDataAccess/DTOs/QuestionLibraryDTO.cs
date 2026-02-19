namespace Survey.DAL.DTOs
{
    public class QuestionLibraryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? QuestionGroupLibraryId { get; set; }
        public int QuestionTypeId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public string? Note { get; set; }
        public int Priority { get; set; }
        public QuestionTypeDTO? QuestionType { get; set; }
        public QuestionGroupLibraryDTO? QuestionGroupLibrary { get; set; }
        public ICollection<PredefinedAnswerLibraryDTO> PredefinedAnswerLibraries { get; set; }
        public QuestionLibraryDTO()
        {
            PredefinedAnswerLibraries = new List<PredefinedAnswerLibraryDTO>();
        }
    }
}
