using LipstickDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LipstickDataAccess.Configurations
{
    public class PageIntroConfiguration : IEntityTypeConfiguration<PageIntroDTO>
    {
        public void Configure(EntityTypeBuilder<PageIntroDTO> builder)
        {
            builder.ToTable("Table_PageIntros");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.TitleEN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.TitleVN).IsRequired().HasMaxLength(255);
        }
    }
}
