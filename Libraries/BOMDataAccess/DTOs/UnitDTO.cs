namespace BOMDataAccess.DTOs
{
    public class UnitDTO : BaseDTO
    {
        public int Id { get; set; }
        public int UnitGroupId { get; set; }
        public int? Index { get; set; }
        public int? Coefficient { get; set; }
        public required string Name { get; set; }
        public required string Symbol { get; set; }
        public string? Note { get; set; }
        public bool IsSystem { get; set; } = false;
        public UnitGroupDTO? UnitGroup { get; set; }
    }
}