using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;

namespace Stock.DAL.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<CompanyDTO>
    {
        public void Configure(EntityTypeBuilder<CompanyDTO> builder)
        {
            builder.ToTable("Companies");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
