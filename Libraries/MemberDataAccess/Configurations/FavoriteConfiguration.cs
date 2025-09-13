using MemberDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberDataAccess.Configurations
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
