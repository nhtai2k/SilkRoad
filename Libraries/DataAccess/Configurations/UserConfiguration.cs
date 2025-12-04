using DataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserDTO>
    {
        public void Configure(EntityTypeBuilder<UserDTO> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.CreatedOn).IsRequired();
            builder.Property(s => s.ModifiedOn).IsRequired();
            builder.Property(s => s.Email).IsRequired();
            builder.HasIndex(s => s.Email).IsUnique();
            builder.HasData([new UserDTO()
            {
                Id = 1,
                Email = "jsonmasker@gmail.com",
                UserName = "admin",
                NormalizedUserName ="ADMIN",
                NormalizedEmail = "JSONMASKER@GMAIL.COM",
                //123123
                PasswordHash = "AQAAAAIAAYagAAAAEBqYupXb3q2vZNJOJJ3n/06IR+gi06F0PPpKg7FYW28k0S9DLN0Ct2nKc95H8ZaWzQ==",
                SecurityStamp = "MCPIPS6ZUHZPKFMTGP23N4HC65V3DD5U",
                ConcurrencyStamp = "d80acb9d-e6d1-433f-ae6d-d9be0aa87643",
                CreatedBy = "System",
                ModifiedBy = "System",
                IsActive = true,
                IsDeleted = false,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            },
            new UserDTO()
            {
                Id = 2,
                Email = "tranthibaongoc779152@gmail.com",
                UserName = "baongoc",
                NormalizedUserName ="BAONGOC",
                NormalizedEmail = "TRANTHIBAONGOC779152@GMAIL.COM",
                //123123
                PasswordHash = "AQAAAAIAAYagAAAAEJQIa+hJeFzLkVaHpmxKMrO4mfQ9867u0fyjan1pdVP5hQMvQd9VcJC0zP0De/FH2w==",
                SecurityStamp = "WPN32OCCQQ27WSIHMJDYFU3MXZDKYM4K",
                ConcurrencyStamp = "3d8f3fdf-c482-4b8b-879e-66ed6e6ba863",
                CreatedBy = "System",
                ModifiedBy = "System",
                IsActive = true,
                IsDeleted = false,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            }]);
        }
    }
}
