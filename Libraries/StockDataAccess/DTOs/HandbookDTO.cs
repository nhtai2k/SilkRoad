namespace Stock.DAL.DTOs
{
    public class HandbookDTO : BaseDTO
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
