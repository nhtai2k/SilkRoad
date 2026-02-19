using Lipstick.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lipstick.DAL.Configurations
{
    public class PageContentConfiguration : IEntityTypeConfiguration<PageContentDTO>
    {
        public void Configure(EntityTypeBuilder<PageContentDTO> builder)
        {
            builder.ToTable("Table_PageContents");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
