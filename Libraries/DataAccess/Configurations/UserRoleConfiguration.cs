using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class UserRoleConfiguration : IEntityTypeConfiguration<UserRoleDTO>
    {
        public void Configure(EntityTypeBuilder<UserRoleDTO> builder)
        {
            builder.HasData([
   new UserRoleDTO
                    {
                        UserId = 1,
                        RoleId = 1
                    }]);
        }
    }
}
