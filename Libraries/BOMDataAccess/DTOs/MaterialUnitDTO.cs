using System.ComponentModel.DataAnnotations;

namespace BOM.DAL.DTOs
{
    public class MaterialUnitDTO
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public int MaterialId { get; set; }
        public int UnitId { get; set; }
        [Range(0, 255)]
        public int Level { get; set; }
        public double Factor { get; set; }
        public double? Value { get; set; }
        public MaterialDTO? Material { get; set; }
        public MaterialUnitDTO? Parent { get; set; }
        public ICollection<MaterialUnitDTO>? Children { get; set; }
    }
}
