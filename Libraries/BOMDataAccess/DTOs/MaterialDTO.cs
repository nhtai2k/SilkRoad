using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOM.DAL.DTOs
{
    public class MaterialDTO : BaseDTO
    {
        public int Id { get; set; }
        public int MaterialGroupId { get; set; }
        public int MaterialCategoryId { get; set; }
        public int BaseUnitId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public double? Price { get; set; }
        public string? ImagePath { get; set; }
        public string? Note { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
        public ICollection<MaterialUnitDTO>? MaterialUnits { get; set; }
    }
}
