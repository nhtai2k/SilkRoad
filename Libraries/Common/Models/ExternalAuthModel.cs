namespace Common.Models
{
    public class ExternalAuthModel
    {
        public required string Provider { get; set; }
        public required string IdToken { get; set; }
    }
}
