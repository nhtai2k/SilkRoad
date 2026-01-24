namespace System.Share.Models
{
    public class UserLoginInfoModel
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        //public string? FullName { get; set; }
        public string? Provider { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
