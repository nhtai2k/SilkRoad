using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class UserTokenConfiguration : IEntityTypeConfiguration<UserTokenDTO>
    {
        public void Configure(EntityTypeBuilder<UserTokenDTO> builder)
        {
            builder.ToTable("UserTokens");
        }
    }
}
