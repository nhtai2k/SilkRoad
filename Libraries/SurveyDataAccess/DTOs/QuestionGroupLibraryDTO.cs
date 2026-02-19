namespace Survey.DAL.DTOs
{
    public class QuestionGroupLibraryDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public string? Note { get; set; }
        public int Priority { get; set; }
        public ICollection<QuestionLibraryDTO>? QuestionLibraries { get; set; }
    }
}
