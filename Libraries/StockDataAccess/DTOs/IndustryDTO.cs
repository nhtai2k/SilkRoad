namespace Stock.DAL.DTOs
{
    public class IndustryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public required string Name { get; set; }
    }
}
