namespace System.Share.Models.BOMModels
{
    public class DishFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int DishGroupId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
    }
}
