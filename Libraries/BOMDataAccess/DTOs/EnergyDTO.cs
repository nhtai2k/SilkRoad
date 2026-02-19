using System.ComponentModel.DataAnnotations;

namespace BOM.DAL.DTOs
{
    public class EnergyDTO : BaseDTO
    {
        public int Id { get; set; }
        public int UnitId { get; set; }
        [Range(0, 255)]
        public int Priority { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public double? Price { get; set; }
        public string? Note { get; set; }
        public string? ImagePath { get; set; }
    }
}
