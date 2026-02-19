namespace System.Share.Models
{
    public class OptionModel
    {
        public required object Id { get; set; }
        public object? ParentId { get; set; }
        public required string Name { get; set; }
        public ICollection<OptionModel>? Children { get; set; }
    }
}
