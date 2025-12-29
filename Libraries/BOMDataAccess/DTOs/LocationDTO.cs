//using DataAccess.DTOs;
//using Microsoft.AspNetCore.Http;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace DataAccess.BOMDTOs
//{
//    public class LocationDTO : BaseDTO
//    {
//        public int Id { get; set; }
//        public int MallId { get; set; }
//        public required string Code { get; set; }
//        public required string Name { get; set; }
//        public string? Note { get; set; }
//        public string? ImagePath { get; set; }
//        public MallDTO? Mall { get; set; }
//        public ICollection<AreaDTO>? Areas { get; set; }
//        [NotMapped]
//        public IFormFile? ImageFile { get; set; }
//    }
//}
