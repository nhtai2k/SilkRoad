using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System.DAL.DTOs
{
    public class RefreshTokenDTO
    {
        public Guid Id { get; set; }

        public required string TokenHash { get; set; }  // 🔐 hashed
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsRevoked { get; set; }

        public int UserId { get; set; }
        public UserDTO? User { get; set; }

        public string? DeviceId { get; set; }
        public string? IpAddress { get; set; }
    }

}
