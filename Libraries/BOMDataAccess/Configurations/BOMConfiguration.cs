using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class BOMConfiguration : IEntityTypeConfiguration<BOMDTO>
    {
        public void Configure(EntityTypeBuilder<BOMDTO> builder)
        {
            builder.ToTable("Table_BOMs");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
            builder.HasIndex(s => s.Code).IsUnique();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
        }
    }
}
