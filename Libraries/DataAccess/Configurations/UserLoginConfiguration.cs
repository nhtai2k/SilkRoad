using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class UserLoginConfiguration : IEntityTypeConfiguration<UserLoginDTO>
    {
        public void Configure(EntityTypeBuilder<UserLoginDTO> builder)
        {
            builder.ToTable("UserLogins");
        }
    }
}
