using System.ComponentModel.DataAnnotations.Schema;

namespace BOMDataAccess.DTOs
{
    public class BOMMaterialLinkDTO
    {
        public Guid Id { get; set; }
        public Guid BOMCategoryId { get; set; }
        public int MaterialId { get; set; }
        public double Quantity { get; set; }
        public string? Note { get; set; }
        public BOMCategoryDTO? BOMCategory { get; set; }
        [NotMapped]
        public string? MaterialCode { get; set; }
        [NotMapped]
        public string? MaterialName { get; set; }
        [NotMapped]
        public string? UnitName { get; set; }
        [NotMapped]
        public string? MaterialGroupName { get; set; }
        [NotMapped]
        public double? Price { get; set; }
        [NotMapped]
        public double? Amount { get; set; }


    }
}
