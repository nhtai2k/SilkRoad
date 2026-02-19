namespace Survey.DAL.DTOs
{
    public class QuestionTypeDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public ICollection<QuestionLibraryDTO> Questions { get; set; }
        public QuestionTypeDTO()
        {
            IsActive = true;
            CreatedAt = DateTime.Now;
            Questions = new List<QuestionLibraryDTO>();
        }
    }
}
