using System.ComponentModel.DataAnnotations;

namespace BOM.DAL.DTOs
{
    public class DepartmentDTO : BaseDTO
    {
        public int Id { get; set; }
        [Range(0, 255)]
        public int Priority { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
    }
}
