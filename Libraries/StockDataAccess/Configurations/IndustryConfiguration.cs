using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;

namespace Stock.DAL.Configurations
{
    public class IndustryConfiguration : IEntityTypeConfiguration<IndustryDTO>
    {
        public void Configure(EntityTypeBuilder<IndustryDTO> builder)
        {
            builder.ToTable("Industries");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
