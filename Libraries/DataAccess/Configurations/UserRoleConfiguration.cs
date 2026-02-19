using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class UserRoleConfiguration : IEntityTypeConfiguration<UserRoleDTO>
    {
        public void Configure(EntityTypeBuilder<UserRoleDTO> builder)
        {
            builder.ToTable("UserRoles");
            builder.HasData([
   new UserRoleDTO
                    {
                        UserId = 1,
                        RoleId = 1
                    },
  new UserRoleDTO
                    {
                        UserId = 2,
                        RoleId = 1
                    },
            ]);
            builder.HasOne(s => s.User)
            .WithMany(g => g.UserRoles)
            .HasForeignKey(s => s.UserId);
        }
    }
}
