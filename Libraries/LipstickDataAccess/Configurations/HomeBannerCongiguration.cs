using Lipstick.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lipstick.DAL.Configurations
{
    public class HomeBannerCongiguration : IEntityTypeConfiguration<HomeBannerDTO>
    {
        public void Configure(EntityTypeBuilder<HomeBannerDTO> builder)
        {
            builder.ToTable("Table_HomeBanners");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
