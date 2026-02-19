using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOM.DAL.DTOs
{
    public class BOMCategoryDTO
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public int BOMId { get; set; }
        [Range(0, 255)]
        public int Priority { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? Tag { get; set; }
        public BOMDTO? BOM { get; set; }
        public BOMCategoryDTO? Parent { get; set; }
        public ICollection<BOMCategoryDTO>? Children { get; set; }
        public ICollection<BOMPropertyLinkDTO>? BOMPropertyLinks { get; set; }
        public ICollection<BOMMaterialLinkDTO>? BOMMaterialLinks { get; set; }
        [NotMapped]
        public double? Amount { get; set; }
    }
}
