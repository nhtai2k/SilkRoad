using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Restaurant.DAL.DTOs;

namespace Restaurant.DAL.Configurations
{
    internal class TableConfiguration : IEntityTypeConfiguration<TableDTO>
    {
        public void Configure(EntityTypeBuilder<TableDTO> builder)
        {
            builder.ToTable("TB_Tables");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.NameEN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.NameVN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.NameCN).IsRequired().HasMaxLength(255);
        }
    }
}
