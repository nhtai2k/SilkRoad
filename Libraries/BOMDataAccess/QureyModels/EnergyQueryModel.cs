namespace BOMDataAccess.QureyModels
{
    public class EnergyQueryModel
    {
        //public int Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public double? Price { get; set; }
        public string? Note { get; set; }
        public string? Symbol { get; set; }
    }
}
