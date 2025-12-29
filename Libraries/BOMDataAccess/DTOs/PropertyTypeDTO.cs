namespace BOMDataAccess.DTOs
{
    public class PropertyTypeDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
    }
}
