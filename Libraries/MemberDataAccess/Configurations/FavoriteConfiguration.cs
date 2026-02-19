using Member.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Member.DAL.Configurations
{
    public class FavoriteConfiguration : IEntityTypeConfiguration<FavoriteDTO>
    {
        public void Configure(EntityTypeBuilder<FavoriteDTO> builder)
        {
            builder.ToTable("Table_Favorites");
            builder.HasKey(s => new { s.ProductId, s.UserId });
            builder.Property(s => s.ProductId).IsRequired();
            builder.Property(s => s.UserId).IsRequired();
        }
    }
}
