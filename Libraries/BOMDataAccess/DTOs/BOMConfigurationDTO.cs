namespace BOM.DAL.DTOs
{
    public class BOMConfigurationDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public int Priority { get; set; }
        public string? Tag { get; set; }
        public string? Note { get; set; }
        public BOMConfigurationDTO? Parent { get; set; }
        public ICollection<BOMConfigurationDTO>? Children { get; set; }
    }
}