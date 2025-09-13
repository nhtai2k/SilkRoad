using MemberDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MemberDataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserDTO>
    {
        public void Configure(EntityTypeBuilder<UserDTO> builder)
        {
            builder.ToTable("Table_Users");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.FullName).HasColumnType("nvarchar(255)");
            builder.Property(x => x.GenderId).HasColumnType("tinyint");
            builder.Property(s => s.Address).HasColumnType("nvarchar(1000)");
            builder.Property(s => s.CreatedOn).IsRequired();
            builder.Property(s => s.ModifiedOn).IsRequired();
            builder.Property(s => s.PhoneNumber).IsRequired();
            builder.HasIndex(s => s.PhoneNumber).IsUnique();
        }
    }
}
