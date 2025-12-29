//using DataAccess.DTOs;
//using Microsoft.AspNetCore.Http;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace DataAccess.BOMDTOs
//{
//    public class MallDTO : BaseDTO
//    {
//        public int Id { get; set; }
//        public required string Code { get; set; }
//        public required string Name { get; set; }
//        public string? Note { get; set; }
//        public string? ImagePath { get; set; }
//        public ICollection<LocationDTO>? Locations { get; set; }
//        [NotMapped]
//        public IFormFile? ImageFile { get; set; }
//    }
//}
