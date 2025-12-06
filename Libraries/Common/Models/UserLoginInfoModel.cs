using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Models
{
    public class UserLoginInfoModel
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
