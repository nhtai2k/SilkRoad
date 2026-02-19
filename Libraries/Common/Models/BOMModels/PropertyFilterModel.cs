namespace System.Share.Models.BOMModels
{
    public class PropertyFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int PropertyTypeId { get; set; }
        public int DepartmentId { get; set; }
        public int UnitId { get; set; }
        public string? SearchText { get; set; }

    }
}
