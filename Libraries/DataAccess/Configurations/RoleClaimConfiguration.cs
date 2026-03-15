using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class RoleClaimConfiguration : IEntityTypeConfiguration<RoleClaimDTO>
    {
        public void Configure(EntityTypeBuilder<RoleClaimDTO> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.HasOne(s => s.Role).WithMany(r => r.RoleClaims).HasForeignKey(s => s.RoleId);
        }
    }
}
