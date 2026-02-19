namespace Restaurant.BLL.Models
{
    public class ReservationFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TableId { get; set; } // Nullable to allow filtering without category
        public int StatusId { get; set; } // Nullable to allow filtering without status
        public string? SearchText { get; set; } // Nullable to allow filtering without name
    }
}
