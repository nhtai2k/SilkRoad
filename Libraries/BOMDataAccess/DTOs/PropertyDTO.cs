using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOMDataAccess.DTOs
{
    public class PropertyDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int PropertyGroupId { get; set; }
        public int UnitId { get; set; }
        public int? EnergyConsumptionUnitId { get; set; }
        public int? DepartmentId { get; set; }
        public int? TimeUnitId { get; set; }
        public int? EnergyId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        //public double? Quantity { get; set; }
        public double? Price { get; set; }
        public double? EnergyConsumption { get; set; }
        public double? Depreciation { get; set; }
        public bool IsConsumable { get; set; } // Là công cụ tiêu hao
        public bool IsEnergyConsumable { get; set; } // Là công cụ tiêu thụ năng lượng
        public DateTime? StartDepreciation { get; set; } // Ngày khấu hao
        public DateTime? EndDepreciation { get; set; } // Ngày khấu hao
        public string? Note { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public double? DepreciationValue { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
