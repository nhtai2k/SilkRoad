namespace System.Share.Models.BOMModels
{
    public class EmployeeFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int DepartmentId { get; set; }
        public int RankId { get; set; }
        public string? SearchText { get; set; }

    }
}
