using Member.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Member.DAL.Configurations
{
    internal class NotificationConfiguration : IEntityTypeConfiguration<NotificationDTO>
    {
        public void Configure(EntityTypeBuilder<NotificationDTO> builder)
        {
            builder.ToTable("Table_Notifications");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
