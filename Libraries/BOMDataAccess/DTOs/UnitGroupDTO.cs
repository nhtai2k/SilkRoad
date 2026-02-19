using System.ComponentModel.DataAnnotations;

namespace BOM.DAL.DTOs
{
    public class UnitGroupDTO : BaseDTO
    {
        public int Id { get; set; }
        [Range(0, 255)]
        public int Priority { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public bool IsSystem { get; set; } = false;
        public ICollection<UnitDTO>? Children { get; set; }
    }
}
