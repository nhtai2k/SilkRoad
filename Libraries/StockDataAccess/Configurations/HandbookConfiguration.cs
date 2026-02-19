using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;

namespace Stock.DAL.Configurations
{
    public class HandbookConfiguration : IEntityTypeConfiguration<HandbookDTO>
    {
        public void Configure(EntityTypeBuilder<HandbookDTO> builder)
        {
            builder.ToTable("Handbooks");
            builder.HasKey(h => h.Id);
            builder.Property(h => h.Id).ValueGeneratedOnAdd();
            builder.Property(h => h.Title).IsRequired().HasMaxLength(255);
            builder.Property(h => h.Content).IsRequired();
            builder.Property(h => h.CreatedBy).HasMaxLength(255);
            builder.Property(h => h.ModifiedBy).HasMaxLength(255);
        }
    }
}
