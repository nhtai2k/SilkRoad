using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCore.DAL.DTOs;

namespace System.DAL.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshTokenDTO>
    {
        public void Configure(EntityTypeBuilder<RefreshTokenDTO> builder)
        {
            builder.ToTable("RefreshTokens");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.TokenHash).IsRequired();
            builder.HasOne<UserDTO>(s => s.User)
                   .WithMany(u => u.RefreshTokens)
                   .HasForeignKey(s => s.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
