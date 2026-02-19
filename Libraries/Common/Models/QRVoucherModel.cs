namespace System.Share.Models
{
    public class QRVoucherModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public QRVoucherModel()
        {
            Name = string.Empty;
            Code = string.Empty;
        }
    }
}
