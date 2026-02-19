using System.ComponentModel.DataAnnotations.Schema;

namespace BOM.DAL.DTOs
{
    public class BOMPropertyLinkDTO
    {
        public Guid Id { get; set; }
        public Guid BOMCategoryId { get; set; }
        public int PropertyId { get; set; }
        public double? Quantity { get; set; }
        public string? Note { get; set; }
        public BOMCategoryDTO? BOMCategory { get; set; }
        [NotMapped]
        public string? PropertyCode { get; set; }
        [NotMapped]
        public string? PropertyName { get; set; }
        [NotMapped]
        public string? PropertyTypeName { get; set; }
        [NotMapped]
        public string? UnitName { get; set; }
    }
}
