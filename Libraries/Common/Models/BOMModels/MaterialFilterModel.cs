namespace System.Share.Models.BOMModels
{
    public class MaterialFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int MaterialGroupId { get; set; }
        public int MaterialCategoryId { get; set; }
        public int UnitId { get; set; }
        public string? SearchText { get; set; }
    }
}
