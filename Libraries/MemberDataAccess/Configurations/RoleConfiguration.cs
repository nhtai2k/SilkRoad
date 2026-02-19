using Member.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Member.DAL.Configurations
{
    internal class RoleConfiguration : IEntityTypeConfiguration<RoleDTO>
    {
        public void Configure(EntityTypeBuilder<RoleDTO> builder)
        {
            builder.ToTable("Table_Roles");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
