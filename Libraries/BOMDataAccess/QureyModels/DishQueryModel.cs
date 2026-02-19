namespace BOM.DAL.QureyModels
{
    public class DishQueryModel
    {
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? GroupName { get; set; }
        public string? Note { get; set; }
    }
}
