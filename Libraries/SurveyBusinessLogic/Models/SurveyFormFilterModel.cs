namespace Survey.BLL.Models
{
    public class SurveyFormFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int StoreId { get; set; }
        public int FormStyleId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsLimited { get; set; }
        public bool? IsPublished { get; set; }
        public string? SearchText { get; set; }
    }
}
